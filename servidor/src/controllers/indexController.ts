//Para definir petición y respuesta
import { Request, Response } from "express";
import pool from "../database";

class IndexController {
  public index(req: Request, res: Response) {
    res.send("Hello from indexController");
  }

  //Se registra nuevo usuario
  public async register(req: Request, res: Response): Promise<any> {
    console.log(req.body);

    // Comprobamos contraseñas iguales
    if (req.body.password == req.body.repetirPassword) {
      //Se crea objeto en COLABORADOR
      await pool.query(
        "INSERT INTO colaborador (nombre, apellidos, email, password) VALUES (?,?,?,?)",
        [
          req.body.nombre,
          req.body.apellidoPaterno + " " + req.body.apellidoMaterno,
          req.body.email,
          req.body.password,
        ]
      );
      res.json({ message: "Colaborador guardado" });
    } else {
      res.status(401).send({ message: "Las contraseñas son iguales" });
    }
  }

  //Se comprueba que exista el usuario
  public async login(req: Request, res: Response,): Promise<any> {
    //Hacer validaciones con req.body.email req.body.password
    const email = req.body.email;
    const password = req.body.password;

    //Obtenemos objetos con los valores de petición
    const datoComprobacion = await pool.query(
      "SELECT * FROM colaborador WHERE email=? AND password=?",
      [email, password]
    ); 

    //Cuando hay un dato que coincide con el email y la contraseña
    if (datoComprobacion.length == 1) {
      //Cuando todo sale bien se manda código de OK
      const idDatoComprobacion = await pool.query(
        "SELECT idColaborador FROM colaborador WHERE email=? AND password=?",
        [email, password]
      );

       if (!req!.session!.viewCount) {
         req!.session!.viewCount = 1;
       } else {
         req!.session!.viewCount += 1;
      }
      req!.session!.idUserIniciado = idDatoComprobacion[0].idColaborador;
      req!.session!.nombreUserIniciado= datoComprobacion[0].nombre;
      console.log("Sesión iniciada como: "+req!.session!.idUserIniciado+" "+req!.session!.nombreUserIniciado);
      console.log("Veces iniciadas en el dispositivo: "+req!.session!.viewCount)

      res.status(200).send({
          id:idDatoComprobacion[0].idColaborador,
          nombre: datoComprobacion[0].nombre,
          apellidoPaterno: datoComprobacion[0].apellidoPaterno,
          message: datoComprobacion[0]
       });

      //res.redirect("/loginCorrecto");
    } else {
      res.status(401).send({ message: "Credenciales no coinciden" });
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
  public async equipos(req: Request, res:Response): Promise<any>{

    let vistaEquipos=[];
    let tareas;
    let eventos;

    const datos = await pool.query("SELECT * FROM listaequipo WHERE idColaborador=?", [req!.session!.idUserIniciado]);
    if (datos.length >= 1){
      let aux = 0;
      for (let equipo of datos){
        const nombreEquipo = await pool.query("SELECT nombre FROM equipo WHERE idEquipo = ?",[equipo.idEquipo]);
        
        if (equipo.encargado){
          tareas = await pool.query("SELECT tarea.nombre, tarea.fecha, categoria.nombreCategoria FROM tarea INNER JOIN categoria ON tarea.idCategoria = categoria.idCategoria AND idEquipo = ?",[equipo.idEquipo]);
          eventos = await pool.query("SELECT evento.nombre, evento.fecha, categoria.nombreCategoria FROM evento INNER JOIN categoria ON evento.idCategoria = categoria.idCategoria AND idEquipo = ?",[equipo.idEquipo]);
        }
        else{
          tareas = await pool.query(
            "SELECT sincategorias.nombre, sincategorias.fecha, categoria.nombreCategoria FROM categoria INNER JOIN (SELECT tarea.nombre, tarea.fecha, tarea.idCategoria FROM tarea INNER JOIN (SELECT idTarea FROM listatareas WHERE idColaborador = ?) AS tareaspersonales ON tarea.idTarea = tareaspersonales.idTarea AND tarea.idEquipo = ? ) AS sincategorias ON categoria.idCategoria = sincategorias.idCategoria", [req!.session!.idUserIniciado,equipo.idEquipo]);
          eventos =  await pool.query(
            "SELECT sincategorias.nombre, sincategorias.fecha, categoria.nombreCategoria FROM categoria INNER JOIN (SELECT evento.nombre, evento.fecha, evento.idCategoria FROM evento INNER JOIN (SELECT idEvento FROM listaeventos WHERE idColaborador = ?) AS eventospersonales ON evento.idEvento = eventospersonales.idEvento AND evento.idEquipo = ? ) AS sincategorias ON categoria.idCategoria = sincategorias.idCategoria",[req!.session!.idUserIniciado,equipo.idEquipo]);
        }

        vistaEquipos[aux]={nombreEquipo, tareas, eventos};
        aux = aux + 1;
      }
      
      
      res.status(200).json(vistaEquipos);
    }else{
      res.status(204).send({message: "No hay equipos para el Usuario Ingresado"});
    }
    

  } 
}

//Instanciamos y exportamos toda la clase
export const indexController = new IndexController();
