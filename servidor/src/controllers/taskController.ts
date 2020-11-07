//Para definir petición y respuesta
import { Request, Response } from "express";
import pool from "../database";

class TaskController {
  public index(req: Request, res: Response) {
    res.send("Hello from taskController");
  }

  /*  Se agrega una nueva tarea segun los datos
      ingresados en el formulario /taskmaker
  */
  public async addTask(req: Request, res: Response): Promise<any> {
    console.log(req.body);
    
    // Query para agregar tarea
    await pool.query(
      "INSERT INTO tarea (nombre, fecha, descripcion, idCategoria, idEquipo) VALUES (?,?,?,?,?)",
      [
        req.body.nombre,
        req.body.anio + "-" + req.body.mes + "-" + req.body.dia,
        req.body.descripcion,
        req.body.categoria,
        req.body.equipo
      ]
    );
    res.status(200).json({ message: "Tarea guardada" });
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
  public async categorias(req: Request, res:Response): Promise<any>{

    let listaCategorias=[];
    let nombreCategoria;
    let idCategoria;

    const datos = await pool.query("SELECT * FROM categoria");
    
    if (datos.length >= 1){
      let aux = 0;
      for (let categoria of datos){
        nombreCategoria = await pool.query("SELECT nombreCategoria FROM categoria WHERE idCategoria=?",[categoria.idCategoria]);
        idCategoria = await pool.query("SELECT idCategoria FROM categoria WHERE idCategoria=?",[categoria.idCategoria]);
        
        listaCategorias[aux]={nombreCategoria, idCategoria};
        aux = aux + 1;
      }
      res.status(200).json(listaCategorias);
    }else{
      res.status(204).send({message: "No se adquirieron categorias"});
    }
  } 

  public async colaboradores(req: Request, res:Response): Promise<any>{

    let listaColaboradores=[];
    let nombreColaborador;
    let apellidosColaborador;
    let idColaborador;

    const datos = await pool.query("SELECT * FROM colaborador");
    
    if (datos.length >= 1){
      let aux = 0;
      for (let colaborador of datos){
        nombreColaborador = await pool.query("SELECT nombre FROM colaborador WHERE idColaborador=?",[colaborador.idColaborador]);
        apellidosColaborador = await pool.query("SELECT apellidos FROM colaborador WHERE idColaborador=?",[colaborador.idColaborador]);
        idColaborador = await pool.query("SELECT idColaborador FROM colaborador WHERE idColaborador=?",[colaborador.idColaborador]);
        
        listaColaboradores[aux]={nombreColaborador, apellidosColaborador, idColaborador};
        aux = aux + 1;
      }
      res.status(200).json(listaColaboradores);
    }else{
      res.status(204).send({message: "No se adquirieron colaboradores"});
    }
  }

  /*public async equipos(req: Request, res:Response): Promise<any>{

    let listaEquipos=[];
    let nombreEquipo;
    let id;

    const datos = await pool.query("SELECT * FROM listaequipo WHERE idColaborador=?", [req!.session!.idUserIniciado]);
    if (datos.length >= 1){
      let aux = 0;
      for (let equipo of datos){
        nombreEquipo = await pool.query("SELECT nombre,idEquipo FROM equipo WHERE idEquipo = ?",[equipo.idEquipo]);

        listaEquipos[aux]={nombreEquipo};
        aux = aux + 1;
      }
      
      
      res.status(200).json(listaEquipos);
    }else{
      res.status(204).send({message: "No hay equipos para el Usuario Ingresado"});
    }
    
  }*/
  

}

//Instanciamos y exportamos toda la clase
export const taskController = new TaskController();
