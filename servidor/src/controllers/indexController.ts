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
          });
        } else {
          res.status(401).send({ message: "Credenciales no coinciden" });
        }
      });
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
          "SELECT nombre,idEquipo FROM equipo WHERE idEquipo = ?",
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
            "SELECT sincategorias.nombre, sincategorias.fecha AS date, categoria.nombreCategoria FROM categoria INNER JOIN (SELECT tarea.nombre, DATE_FORMAT(tarea.fecha, '%d-%m-%Y') AS fecha, tarea.idCategoria FROM tarea INNER JOIN (SELECT idTarea FROM listatareas WHERE idColaborador = ?) AS tareaspersonales ON tarea.idTarea = tareaspersonales.idTarea AND tarea.idEquipo = ? ) AS sincategorias ON categoria.idCategoria = sincategorias.idCategoria ORDER BY date LIMIT 5",
            [req!.session!.idUserIniciado, equipo.idEquipo]
          );
          eventos = await pool.query(
            "SELECT sincategorias.nombre, sincategorias.fecha AS date, categoria.nombreCategoria FROM categoria INNER JOIN (SELECT evento.nombre, DATE_FORMAT(evento.fecha, '%d-%m-%Y') AS fecha, evento.idCategoria FROM evento INNER JOIN (SELECT idEvento FROM listaeventos WHERE idColaborador = ?) AS eventospersonales ON evento.idEvento = eventospersonales.idEvento AND evento.idEquipo = ? ) AS sincategorias ON categoria.idCategoria = sincategorias.idCategoria ORDER BY date LIMIT 5",
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

  /*  Query para agregar una nueva tarea
   /  implementado en /components/task-add
  */
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
    res.status(200).json({ message: "Tarea guardada" });
  }

  /*  Query para modificar una tarea
   /  implementado en /components/task-mod
  */
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
    res.status(200).json({ message: "Tarea modificada" });
  }

  /*  Query para agregar una nuevo evento
   /  implementado en /components/event-add
  */
  public async addEvent(req: Request, res: Response): Promise<any> {
    console.log(req.body);

    await pool.query(
      "INSERT INTO evento (nombre, fecha, hora, descripcion, idCategoria, idEquipo, enlaceVideoconferencia, privacidad) VALUES (?,?,?,?,?,?,?,?)",
      [
        req.body.nombre,
        req.body.anio + "-" + req.body.mes + "-" + req.body.dia,
        req.body.hora + ":" + req.body.minuto,
        req.body.descripcion,
        req.body.categoria,
        req.body.equipo,
        req.body.enlace,
        req.body.privacidad,
      ]
    );
    res.status(200).json({ message: "Evento guardado" });
  }

  /*  Query para modificar un evento
   /  implementado en /components/event-mod
  */
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

  /*  Query para obtener una lista de todas las categorias
   /  implementado en /components/task-add, /components/event-add, /components/team-view
   /  /components/task-mod, /components/event-mod
  */
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

  /*  Query para obtener una lista de colaboradores (todos, por ahora)
   /  implementado en /components/task-add, /components/event-add, /components/team-view
   /  /components/task-mod, /components/event-mod
  */
  public async colaboradores(req: Request, res: Response): Promise<any> {
    let listaColaboradores = [];
    let nombreColaborador;
    let apellidosColaborador;
    let idColaborador;

    const datos = await pool.query("SELECT * FROM colaborador");

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
}

//Instanciamos y exportamos toda la clase
export const indexController = new IndexController();
