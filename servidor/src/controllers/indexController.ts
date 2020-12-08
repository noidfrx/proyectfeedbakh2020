//Para definir petición y respuesta
import { Request, Response } from "express";
import pool from "../database";
import bcrypt = require("bcrypt");

class IndexController {
  public index(req: Request, res: Response) {
    res.send("Hello from indexController");
  }

  //Se registra nuevo usuario
  public async register(req: Request, res: Response): Promise<any> {
    console.log(req.body);

    const password = req.body.password;

    bcrypt.hash(password, 10, async function (err, hash) {
      //Se crea objeto en COLABORADOR
      await pool.query(
        "INSERT INTO colaborador (nombre, apellidos, email, password) VALUES (?,?,?,?)",
        [
          req.body.nombre,
          req.body.apellidoPaterno + " " + req.body.apellidoMaterno,
          req.body.email,
          hash,
        ]
      );
    });

    res.json({ message: "Colaborador guardado" });
  }


  //Se comprueba que exista el usuario

  public async login(req: Request, res: Response): Promise<any> {
    //Hacer validaciones con req.body.email req.body.password
    const email = req.body.email;
    const password = req.body.password;

    //Obtenemos objetos con valor email
    const datoComprobacion = await pool.query(
      "SELECT * FROM colaborador WHERE email=?",
      [email]
    );

    //Cuando hay un dato que coincide con el email y la contraseña
    if (datoComprobacion.length == 1) {
      //Comparar contraseñas y desencriptar
      await bcrypt.compare(password, datoComprobacion[0].password, async function (
        err,
        result
      ) {
        //Si las contraseñas están bien
        if (result) {
          //Cuando todo sale bien se manda código de OK
          const idDatoComprobacion = await pool.query(
            "SELECT idColaborador FROM colaborador WHERE email=?",
            [email]
          );

          //Se guarda nombre e id de colaborador en sesión
          req!.session!.idUserIniciado = idDatoComprobacion[0].idColaborador;
          req!.session!.nombreUserIniciado = datoComprobacion[0].nombre;

          console.log(
            "Sesión iniciada como: " +
              req!.session!.idUserIniciado +
              " " +
              req!.session!.nombreUserIniciado
          );

          //Envia dato de colaborador a angular
          res.status(200).send({
            id: idDatoComprobacion[0].idColaborador,
            nombre: datoComprobacion[0].nombre,
            apellidoPaterno: datoComprobacion[0].apellidoPaterno,
            message: datoComprobacion[0],
            tutorial: datoComprobacion[0].tutorial,
          });
        } else {
          res.status(401).send({ message: "Credenciales no coinciden" });
        }
      });
    }else{
      res.status(401).send({ message: "No existe ese usuario" });
    }
  }

  /* Pide los equipos a los que pertenezca el usuario logeado y retorna todos los datos:
     Nombre del Equipo, las tareas y eventos vinculadas a ese equipo con la fecha y la categoría 
     
     Se crea un arreglo tipo: 
     [Equipo:{
       nombre, 
       {tareas: {nombre, categoria}},
       {evento: {nombre, categoria}}
      }]
     */
  public async equipos(req: Request, res: Response): Promise<any> {
    let vistaEquipos = [];
    let tareas;
    let eventos;

    const datos = await pool.query(
      "SELECT * FROM listaequipo WHERE idColaborador=?",
      [req!.session!.idUserIniciado]
    );
    if (datos.length >= 1) {
      let aux = 0;
      for (let equipo of datos) {
        const nombreEquipo = await pool.query(
          "SELECT nombre,idEquipo,objetivo FROM equipo WHERE idEquipo = ?",
          [equipo.idEquipo]
        );

        if (equipo.encargado) {
          tareas = await pool.query(
            "SELECT tarea.nombre, DATE_FORMAT(tarea.fecha, '%d/%m/%Y') AS date, categoria.nombreCategoria FROM tarea INNER JOIN categoria ON tarea.idCategoria = categoria.idCategoria AND idEquipo = ? ORDER BY date LIMIT 5",
            [equipo.idEquipo]
          );
          eventos = await pool.query(
            "SELECT evento.nombre, DATE_FORMAT(evento.fecha, '%d/%m/%Y') AS date, categoria.nombreCategoria FROM evento INNER JOIN categoria ON evento.idCategoria = categoria.idCategoria AND idEquipo = ? ORDER BY date LIMIT 5",
            [equipo.idEquipo]
          );
        } else {
          tareas = await pool.query(
            "SELECT sincategorias.nombre, sincategorias.fecha AS date, categoria.nombreCategoria FROM categoria INNER JOIN (SELECT tarea.nombre, DATE_FORMAT(tarea.fecha, '%d/%m/%Y') AS fecha, tarea.idCategoria FROM tarea INNER JOIN (SELECT idTarea FROM listatareas WHERE idColaborador = ?) AS tareaspersonales ON tarea.idTarea = tareaspersonales.idTarea AND tarea.idEquipo = ? ) AS sincategorias ON categoria.idCategoria = sincategorias.idCategoria ORDER BY date LIMIT 5",
            [req!.session!.idUserIniciado, equipo.idEquipo]
          );
          eventos = await pool.query(
            "SELECT sincategorias.nombre, sincategorias.fecha AS date, categoria.nombreCategoria FROM categoria INNER JOIN (SELECT evento.nombre, DATE_FORMAT(evento.fecha, '%d/%m/%Y') AS fecha, evento.idCategoria FROM evento INNER JOIN (SELECT idEvento FROM listaeventos WHERE idColaborador = ?) AS eventospersonales ON evento.idEvento = eventospersonales.idEvento AND evento.idEquipo = ? ) AS sincategorias ON categoria.idCategoria = sincategorias.idCategoria ORDER BY date LIMIT 5",
            [req!.session!.idUserIniciado, equipo.idEquipo]
          );
        }

        vistaEquipos[aux] = { nombreEquipo, tareas, eventos };
        aux = aux + 1;
      }

      res.status(200).json(vistaEquipos);
    } else {
      res
        .status(204)
        .send({ message: "No hay equipos para el Usuario Ingresado" });
    }
  }


  //  Query para agregar una nueva tarea

  public async addTask(req: Request, res: Response): Promise<any> {
    console.log(req.body);

    await pool.query(
      "INSERT INTO tarea (nombre, fecha, descripcion, idCategoria, idEquipo) VALUES (?,?,?,?,?)",
      [
        req.body.nombre,
        req.body.anio + "-" + req.body.mes + "-" + req.body.dia,
        req.body.descripcion,
        req.body.categoria,
        req.body.equipo,
      ]
    );

    let idTareaQuery = await pool.query("SELECT idTarea FROM tarea WHERE nombre=? AND idCategoria=? AND descripcion=? AND idEquipo=?",
      [
        req.body.nombre,
        req.body.categoria,
        req.body.descripcion,
        req.body.equipo,
      ]
    );
    
    if(idTareaQuery.length >= 1){
      if(req.body.encargado == 0){
        await pool.query(
          "INSERT INTO listatareas (idTarea, idColaborador) VALUES (?,?)",
          [
            idTareaQuery[0].idTarea,
            req!.session!.idUserIniciado
          ]
        );
      }else{
        await pool.query(
          "INSERT INTO listatareas (idTarea, idColaborador) VALUES (?,?)",
          [
            idTareaQuery[0].idTarea,
            req.body.encargado
          ]
        );
      }
    }else{
      console.log("idTareaQuery esta vacio");
    }

    res.status(200).json({ message: "Tarea guardada" });
  }


  //  Query para modificar una tarea

  public async modTask(req: Request, res: Response): Promise<any> {
    console.log(req.body);

    await pool.query(
      "UPDATE tarea SET nombre=?, fecha=?, descripcion=?, idCategoria=?, idEquipo=? WHERE idTarea=?",
      [
        req.body.nombre,
        req.body.anio + "-" + req.body.mes + "-" + req.body.dia,
        req.body.descripcion,
        req.body.categoria,
        req.body.equipo,
        req.body.tarea,
      ]
    );

    await pool.query(
      "UPDATE listatareas SET idColaborador=? WHERE idTarea=?",
      [
        req.body.encargado,
        req.body.tarea
      ]
    );

    res.status(200).json({ message: "Tarea modificada" });
  }


  // Query para agregar una nuevo evento

  public async addEvent(req: Request, res: Response): Promise<any> {
    await pool.query(
      "INSERT INTO evento (nombre, fecha, hora, descripcion, idEquipo, enlaceVideoconferencia, privacidad) VALUES (?,?,?,?,?,?,?)",
      [
        req.body.nombre,
        req.body.anio + "-" + req.body.mes + "-" + req.body.dia,
        req.body.hora + ":" + req.body.minuto,
        req.body.descripcion,
        req.body.equipo,
        req.body.enlace,
        req.body.privacidad,
      ]
    );

    res.status(200).json({ message: "Evento guardado" });
  }



  // Query para agregar los miembros correspondientes a un evento

  public async addEventMiembros(req: Request, res: Response): Promise<any> {
      for(let integrante of req.body.encargados){
        await pool.query(
          "INSERT INTO listaeventos(idEvento, idColaborador) VALUES (?,?)",
          [req.body.evento, integrante]
        );
      }
    
      res.status(200).json({ message: "Miembros guardado" });
  }


  // Query para retornar la ID un evento segun sus datos

  public async buscar_evento(req: Request, res: Response): Promise<any> {
    let query = await pool.query(
      "SELECT idEvento FROM evento WHERE nombre=? AND descripcion=? AND idEquipo=? AND enlaceVideoconferencia=?",
      [
        req.body.nombre,
        req.body.descripcion,
        req.body.equipo,
        req.body.enlace,
      ]
    );

    if(query.length > 0){
      res.json(query);
    }else{
      res.status(200).json({ message: "No se encontro el evento" });
    }
}



  //  Query para modificar un evento

  public async modEvent(req: Request, res: Response): Promise<any> {
    console.log(req.body);

    await pool.query(
      "UPDATE evento SET nombre=?, fecha=?, hora=?, descripcion=?, idCategoria=?, idEquipo=?, enlaceVideoconferencia=?, privacidad=? WHERE idEvento=?",
      [
        req.body.nombre,
        req.body.anio + "-" + req.body.mes + "-" + req.body.dia,
        req.body.hora + ":" + req.body.minuto,
        req.body.descripcion,
        req.body.categoria,
        req.body.equipo,
        req.body.enlace,
        req.body.privacidad,
        req.body.evento,
      ]
    );
    res.status(200).json({ message: "Evento modificado" });
  }


  //  Query para obtener todas las categorias

  public async categorias(req: Request, res: Response): Promise<any> {
    let listaCategorias = [];
    let nombreCategoria;
    let idCategoria;

    const datos = await pool.query("SELECT * FROM categoria");

    if (datos.length >= 1) {
      let aux = 0;
      for (let categoria of datos) {
        nombreCategoria = await pool.query(
          "SELECT nombreCategoria FROM categoria WHERE idCategoria=?",
          [categoria.idCategoria]
        );
        idCategoria = await pool.query(
          "SELECT idCategoria FROM categoria WHERE idCategoria=?",
          [categoria.idCategoria]
        );

        listaCategorias[aux] = { nombreCategoria, idCategoria };
        aux = aux + 1;
      }
      res.status(200).json(listaCategorias);
    } else {
      res.status(204).send({ message: "No se adquirieron categorias" });
    }
  }

  //  Query para obtener todos los colaboradores 

  public async colaboradores(req: Request, res: Response): Promise<any> {
    let listaColaboradores = [];
    let nombreColaborador;
    let apellidosColaborador;
    let idColaborador;

    const datos = await pool.query("SELECT * FROM amigo WHERE (idColaborador1=? OR idColaborador2=?) AND aceptado=1",
    [req!.session!.idUserIniciado, req!.session!.idUserIniciado]);

    if (datos.length >= 1) {
      let aux = 0;

      for (let colaborador of datos) {
        nombreColaborador = await pool.query(
          "SELECT nombre FROM colaborador WHERE idColaborador=?",
          [colaborador.idColaborador]
        );
        apellidosColaborador = await pool.query(
          "SELECT apellidos FROM colaborador WHERE idColaborador=?",
          [colaborador.idColaborador]
        );
        idColaborador = await pool.query(
          "SELECT idColaborador FROM colaborador WHERE idColaborador=?",
          [colaborador.idColaborador]
        );

        listaColaboradores[aux] = {
          nombreColaborador,
          apellidosColaborador,
          idColaborador,
        };
        aux = aux + 1;
      }
      res.status(200).json(listaColaboradores);
    } else {
      res.status(204).send({ message: "No se adquirieron colaboradores" });
    }
  }


 // Query para obtener una lista de colaboradores (solo los que posea el usuario actual)

 public async colaboradores_usuario(req: Request, res: Response): Promise<any> {
  let listaColaboradores = [];
  let nombreColaborador;
  let apellidosColaborador;
  let idColaborador;
  //let id;

  // Verificar si tiene algun colaborador agregado
  const datos = await pool.query("SELECT DISTINCT colaborador.idColaborador, colaborador.nombre, colaborador.apellidos FROM `colaborador` INNER JOIN amigo ON (amigo.idColaborador1=colaborador.idColaborador OR amigo.idColaborador2=colaborador.idColaborador) AND colaborador.idColaborador!=? AND amigo.aceptado=1 AND (amigo.idColaborador1 = ? OR amigo.idColaborador2 = ?)",
  [req!.session!.idUserIniciado, req!.session!.idUserIniciado, req!.session!.idUserIniciado]);

  if (datos.length >= 1) {
    let aux = 0;

    // Obtenemos id de todos los amigos aceptados

    // Columna idColaborador1
      for (let colaborador of datos) {

        nombreColaborador = await pool.query(
          "SELECT nombre FROM colaborador WHERE idColaborador=?",
          [colaborador.idColaborador]
        );
        apellidosColaborador = await pool.query(
          "SELECT apellidos FROM colaborador WHERE idColaborador=?",
          [colaborador.idColaborador]
        );
        idColaborador = await pool.query(
          "SELECT idColaborador FROM colaborador WHERE idColaborador=?",
          [colaborador.idColaborador]
        );
  
        listaColaboradores[aux] = {
          nombreColaborador,
          apellidosColaborador,
          idColaborador,
        };
        aux = aux + 1;
      }
    
    res.status(200).json(listaColaboradores);
  } else {
    res.status(204).send({ message: "No se adquirieron colaboradores" });
  }
}


// Query para retornar todas las tareas

  public async tareas(req: Request, res: Response): Promise<any> {
    let listaTareas = [];
    let nombre;
    let id;

    const datos = await pool.query("SELECT * FROM tarea");

    if (datos.length >= 1) {
      let aux = 0;
      for (let tarea of datos) {
        nombre = await pool.query("SELECT nombre FROM tarea WHERE idTarea=?", [
          tarea.idTarea,
        ]);
        id = await pool.query("SELECT idTarea FROM tarea WHERE idTarea=?", [
          tarea.idTarea,
        ]);

        listaTareas[aux] = { nombre, id };
        aux = aux + 1;
      }
      res.status(200).json(listaTareas);
    } else {
      res.status(204).send({ message: "No se adquirieron tareas" });
    }
  }


  // Query para retornar las tareas asignadas al usuario

  public async tareas_usuario(req: Request, res: Response): Promise<any> {
    const tareas = await pool.query('SELECT tarea.* FROM tarea INNER JOIN (SELECT listatareas.idTarea FROM listatareas WHERE listatareas.idColaborador=?) AS taskId ON tarea.idTarea=taskId.idTarea',
    [req!.session!.idUserIniciado]);
    console.log(req!.session!.idUserIniciado);
    console.log(tareas);
    
    if(tareas.length >= 1){
      res.status(200).json(tareas);
    }
    res.status(404).send({message: "No se retornaron tareas asignadas al usuario"})
  }


  // Query para retornar las tareas segun el equipo seleccionado
  
  public async tareas_equipo(req: Request, res: Response): Promise<any> {
    let team = Number(req.body.id);

    if(team == 0) {
      /*const tareas = await pool.query('SELECT tarea.* FROM tarea INNER JOIN (SELECT * FROM listaequipo WHERE listaequipo.idColaborador=?) AS equipos_user ON equipos_user.idEquipo=tarea.idEquipo', 
      [req!.session!.idUserIniciado]);*/
      const tareas = await pool.query('SELECT * FROM tarea');

      console.log(tareas);

      if(tareas.length >= 1){
        res.status(200).json(tareas);
      }else{
        res.status(204).send({message: "No se retornaron tareas asignadas al equipo"});
      }
    }else{
      /*const tareas = await pool.query('SELECT tarea.* FROM tarea INNER JOIN (SELECT * FROM listaequipo WHERE listaequipo.idColaborador=?) AS equipos_user ON equipos_user.idEquipo=tarea.idEquipo WHERE tarea.idEquipo=?', 
      [req!.session!.idUserIniciado, team]);*/
      const tareas = await pool.query('SELECT * FROM tarea WHERE idEquipo=?', [team]);
      
      if(tareas.length >= 1){
        res.status(200).json(tareas);
      }else{
        res.status(204).send({message: "No se retornaron tareas asignadas al equipo"});
      }
    }

    
  }

  // Query para retornar el id del ultimo equipo creado
  
  public async equipo_ultimo(req: Request, res: Response): Promise<any> {
    const equipo = await pool.query('SELECT equipo.* FROM equipo INNER JOIN (SELECT * FROM listaequipo WHERE idColaborador=?) AS listado ON listado.idEquipo=equipo.idEquipo ORDER BY equipo.idEquipo DESC LIMIT 1', 
    [req!.session!.idUserIniciado]);

    if(equipo.length >= 1) {
      res.status(200).json(equipo[0]);
    }
    else{
      res.status(204).send({message: "No se retorno el ultimo equipo"});
    }
  }


  // Query para retornar todos los eventos

  public async eventos(req: Request, res: Response): Promise<any> {
    let listaEventos = [];
    let nombre;
    let id;

    const datos = await pool.query("SELECT * FROM evento");

    if (datos.length >= 1) {
      let aux = 0;
      for (let evento of datos) {
        nombre = await pool.query(
          "SELECT nombre FROM evento WHERE idEvento=?",
          [evento.idEvento]
        );
        id = await pool.query("SELECT idEvento FROM evento WHERE idEvento=?", [
          evento.idEvento,
        ]);

        listaEventos[aux] = { nombre, id };
        aux = aux + 1;
      }
      res.status(200).json(listaEventos);
    } else {
      res.status(204).send({ message: "No se adquirieron eventos" });
    }
  }

  // Query para retornar eventos segun usuario

  public async eventos_usuario(req: Request, res: Response): Promise<any> {
    //let listaEventos = [];
    //let nombre;
    //let id;

    const datos = await pool.query("SELECT evento.* FROM `evento` INNER JOIN listaeventos ON evento.idEvento=listaeventos.idEvento WHERE idColaborador=?",
    [req!.session!.idUserIniciado]);

    if (datos.length >= 1) {
      /*let aux = 0;
      for (let evento of datos) {
        nombre = await pool.query(
          "SELECT nombre FROM evento WHERE idEvento=?",
          [evento.idEvento]
        );
        id = await pool.query("SELECT idEvento FROM evento WHERE idEvento=?", [
          evento.idEvento,
        ]);

        listaEventos[aux] = { nombre, id };
        aux = aux + 1;
      }*/
      console.log(datos);
      res.status(200).json(datos);
    } else {
      res.status(204).send({ message: "No se adquirieron eventos del usuario" });
    }
  }


  // Query para retornar eventos segun equipo

  public async eventos_equipo(req: Request, res: Response): Promise<any> {
    let team = Number(req.body.id);
    
    if(team == 0) {
      /*const eventos = await pool.query('SELECT evento.* FROM evento INNER JOIN (SELECT * FROM listaeventos WHERE listaeventos.idColaborador=?) AS eventos_user ON eventos_user.idEvento=evento.idEvento', 
      [req!.session!.idUserIniciado]);*/

      const eventos = await pool.query('SELECT * FROM evento');
      console.log(eventos);

      if(eventos.length >= 1){
        res.status(200).json(eventos);
      }else{
        res.status(204).send({message: "No se retornaron eventos asignados al equipo"});
      }

    }else{
      /*const eventos = await pool.query('SELECT evento.* FROM evento INNER JOIN (SELECT * FROM listaeventos WHERE listaeventos.idColaborador=?) AS eventos_user ON eventos_user.idEvento=evento.idEvento WHERE evento.idEquipo=?', 
      [req!.session!.idUserIniciado, team]);*/
      const eventos = await pool.query('SELECT * FROM evento WHERE idEquipo=?', 
      [team]);
      
      if(eventos.length >= 1){
        res.status(200).json(eventos);
      }else{
        res.status(204).send({message: "No se retornaron eventos asignados al equipo"});
      }

    }
  }


  // Query para comprobar si el usuario ha visto el tutorial

  public async tutorial(req:Request,res:Response):Promise<any>{
    let tutorialCompletado = await pool.query("SELECT tutorial FROM colaborador WHERE idColaborador=?", [req!.session!.idUserIniciado]);

    if (tutorialCompletado.length>=1){
      if ((tutorialCompletado[0].tutorial) == 0){

        await pool.query("UPDATE colaborador SET tutorial=? WHERE idColaborador=?",[1,req!.session!.idUserIniciado]);
        res.status(200).send({
          visto:0,
          mesage:"Se ha marcado como completado el tutorial"
        });
      }else{
        res.status(200).send({
          visto:1,
          message:"Ya se ha visto el tutorial"});
        }
      }else{
        res.status(400).send({message:"Error en la query"});
      }

  }
  public async crearEquipo(req: Request, res: Response): Promise<any> {
    
    await pool.query(
      "INSERT INTO equipo (nombre, objetivo) VALUES (?,?)",[ req.body.nombre, req.body.objetivo]);
      res.status(200).json(true);
  }

  public async getEquipos(req: Request, res: Response): Promise<any> {
    const equipos= await pool.query("SELECT * FROM equipo ORDER BY idEquipo DESC");
    console.log(equipos[0].idEquipo);
    res.status(200).json(equipos[0].idEquipo);
  }

  public async agregarIntegranteEquipo(req: Request, res: Response): Promise<any> {
    
    if(req.body.encargado==1){
      await pool.query(
        "INSERT INTO listaequipo (idEquipo,idColaborador,encargado) VALUES (?,?,?)",[req.body.idEquipo,req!.session!.idUserIniciado,
          req.body.encargado]);
      res.status(200).json({ message: "true" });
    }else{
      await pool.query(
        "INSERT INTO listaequipo (idEquipo,idColaborador,encargado) VALUES (?,?,?)",[req.body.idEquipo,
          req.body.idColaborador,req.body.encargado]);
      res.status(200).json({ message: "true" });
    }
  }

  // Query para retornar una tarea segun su id

  public async una_tarea(req: Request, res: Response): Promise<any> {
    let id = req.body.id;

    const datos = await pool.query("SELECT * FROM tarea WHERE idTarea=?", [id]);

    if (datos.length >= 1) {
      res.status(200).json(datos);
    } else {
      res.status(204).send({ message: "No se adquirio la tarea con el id dado"});
    }
  }

  // Query para retornar un evento segun su id

  public async un_evento(req: Request, res: Response): Promise<any> {
    let id = req.body.id;

    const datos = await pool.query("SELECT * FROM evento WHERE idEvento=?", [id]);

    if (datos.length >= 1) {
      res.status(200).json(datos);
    } else {
      res.status(204).send({ message: "No se adquirio el evento con el id dado"});
    }
  }

  
  // Query para eliminar una tarea segun id

  public async ban_tarea(req: Request, res: Response): Promise<any> {
    await pool.query("DELETE FROM tarea WHERE idTarea=?",
    [req.body.id]);

    res.json({message: "Tarea eliminada"});
  }


  // Query para eliminar una tarea segun id

  public async ban_evento(req: Request, res: Response): Promise<any> {
    await pool.query("DELETE FROM evento WHERE idEvento=?",
    [req.body.id]);

    res.json({message: "Evento eliminado"});
  }


  // Query para verificar si el usuario es el encargado de un equipo

  public async equipo_owner(req: Request, res: Response): Promise<any>{

    const check = await pool.query("SELECT encargado FROM listaequipo WHERE idEquipo=? AND idColaborador=? AND encargado=1",
    [req.body.id, req!.session!.idUserIniciado]);

    // Si el usuario es el admin, se considera instantaneamente como propietario de todos los equipos
    if(req!.session!.idUserIniciado == 1){
      res.status(200).json("1");
    }else{
      res.status(200).json(check);
    }
  }
  


  // Query para verificar si el usuario es el encargado de una tarea

  public async tarea_owner(req: Request, res: Response): Promise<any>{

    const check = await pool.query("SELECT idColaborador FROM listatareas WHERE idTarea=? AND idColaborador=?",
    [req.body.id, req!.session!.idUserIniciado]);

    // Si el usuario es el admin, se considera instantaneamente como propietario de todas las tareas
    if(req!.session!.idUserIniciado == 1){
      res.status(200).json("1");
    }else{
      res.status(200).json(check);
    }
  }



  // Query para marcar una tarea como completada

  public async set_completado(req: Request, res: Response): Promise<any>{
    await pool.query("UPDATE tarea SET completado = '1' WHERE tarea.idTarea = ?", req.body.id);
    res.status(200).json({ message: "Tarea marcada como completada" });
  }



  // Query para marcar una tarea como NO completada

  public async set_nocompletado(req: Request, res: Response): Promise<any>{
    await pool.query("UPDATE tarea SET completado = '0' WHERE tarea.idTarea = ?", req.body.id);
    res.status(200).json({ message: "Tarea marcada como NO completada" });
  }




  // Query para obtener una lista de colaboradores del equipo actual

  public async colaboradores_equipo(req: Request, res: Response): Promise<any> {
    const datos = await pool.query("SELECT DISTINCT colaborador.idColaborador, colaborador.nombre, colaborador.apellidos FROM colaborador INNER JOIN listaequipo ON listaequipo.idEquipo=? AND listaequipo.idColaborador=colaborador.idColaborador AND colaborador.idColaborador!=1",
    [req.body.id]);

    if (datos.length >= 1) {
      res.status(200).json(datos);
    } else {
      res.status(204).send({ message: "No se adquirieron colaboradores" });
    }
  }



  // Query para obtener una lista de colaboradores dela lista de amigos que no esten en el equipo

  public async colaboradores_noequipo(req: Request, res: Response): Promise<any> {
    const datos = await pool.query("SELECT DISTINCT colaborador.idColaborador, colaborador.nombre, colaborador.apellidos FROM colaborador INNER JOIN listaequipo ON listaequipo.idEquipo=? AND listaequipo.idColaborador=colaborador.idColaborador AND colaborador.idColaborador!=1",
    [req.body.id]);

    if (datos.length >= 1) {
      res.status(200).json(datos);
    } else {
      res.status(204).send({ message: "No se adquirieron colaboradores" });
    }
  }




  // Query para obtener los datos de un equipo

  public async datos_equipo(req: Request, res: Response): Promise<any> {
    const datos = await pool.query("SELECT DISTINCT * FROM equipo WHERE idEquipo=?", [req.body.id]);

    if (datos.length >= 1) {
      res.status(200).json(datos);
    } else {
      res.status(204).send({ message: "No se adquirieron datos de equipo" });
    }
  }




  // Query para obtener los datos de un equipo

  public async encargado_tarea(req: Request, res: Response): Promise<any> {
    const datos = await pool.query("SELECT DISTINCT idColaborador FROM listatareas WHERE idTarea=?", [req.body.id]);

    if (datos.length >= 1) {
      res.status(200).json(datos);
    } else {
      res.status(204).send({ message: "No se adquirieron datos de equipo" });
    }
  }

  public async addCategoria(req: Request, res: Response): Promise<any> {
    console.log(req.body);

    await pool.query(
      "INSERT INTO categoria (nombreCategoria) VALUES (?)",
      [
        req.body.nombreCategoria
      ]
    );
    res.status(200).json({ message: "Categoría creada" });
  }


  // Query para sacar un miembro de un equipo

  public async expulsar_miembro(req: Request, res: Response): Promise<any> {
    const datos = await pool.query("DELETE FROM listaequipo WHERE idEquipo = ? AND idColaborador=?", [req.body.id,req.body.colaborador]);

    if (datos.length >= 1) {
      res.status(200).json(datos);
    } else {
      res.status(204).send({ message: "No se completo la operacion (expulsar)" });
    }
  }



  // Query para verificar si un colaborador pertenece a un equipo

  /*public async revisar_miembro_equipo(req: Request, res: Response): Promise<any> {
    const datos = await pool.query("SELECT idColaborador FROM listaequipo WHERE idEquipo=? AND idColaborador=?",
    [req.body.id,req.body.colaborador]);

    if (datos.length >= 1) {
      res.status(200).json(datos);
    } else {
      res.status(204).send({ message: "No se adquirieron colaboradores" });
    }
  }*/
  
  
  
  /*public async nombre_encargado(req: Request, res: Response): Promise<any>{
    console.log("NOMBRE_ENCARGADO");
    console.log("id: ", req.body.id);
    const nombre = await pool.query("SELECT nombre, apellidos FROM colaborador WHERE idColaborador=?",
    [req.body.id]);

    res.status(200).json(nombre);
  }*/

  
}

//Instanciamos y exportamos toda la clase
export const indexController = new IndexController();
