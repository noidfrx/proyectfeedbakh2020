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
}

//Instanciamos y exportamos toda la clase
export const indexController = new IndexController();
