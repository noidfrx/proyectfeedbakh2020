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
  public async login(req: Request, res: Response): Promise<any> {
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
      
      res.status(200).send({message: "Credenciales coinciden"});

    }
    else{
      res.status(401).send({message: "Credenciales no coinciden"});
    }

  }

}

//Instanciamos y exportamos toda la clase
export const indexController = new IndexController();
