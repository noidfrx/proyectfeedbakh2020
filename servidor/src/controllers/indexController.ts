//Para definir petición y respuesta
import { Request, Response } from "express";
import pool from "../database";

class IndexController {
  public index(req: Request, res: Response) {
    res.send("Hello from indexController");
  }

  //Se registra nuevo usuario
  public async register(req:Request, res:Response):Promise<any>{
    console.log(req.body);
    await pool.query("INSERT INTO credencial (email,password) VALUES (?,?)", [req.body.email,req.body.password]);
    res.json({message:'Credencial guardada'});

  }

  //Se comprueba que exista el usuario
  public async login(req: Request, res: Response): Promise<any> {
    //Hacer validaciones con req.body.email req.body.password
    const email = req.body.email;
    const password = req.body.password;

    const datoComprobacion = await pool.query(
      "SELECT * FROM credencial WHERE email=? AND password=?",
      [email, password]
    );

    console.log(datoComprobacion);
    console.log(datoComprobacion.length);
    if (datoComprobacion.length == 1) {
      //Cuando todo sale bien se manda código de OK
      res.status(200).send({ message: "Autenticación OK" });
    }
    
  }
}

//Instanciamos y exportamos toda la clase
export const indexController = new IndexController();
