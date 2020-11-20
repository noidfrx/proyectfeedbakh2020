import { Router, Request, Response } from "express";
import { indexController } from "../controllers/indexController";

class IndexRoutes {
  //Instanciamos router
  public router: Router = Router();
  //public viewCount:number;

  constructor() {
    //Ejecutamos config
    this.config();
    //this.viewCount=0;
  }

  //Se define ruta inicial de la aplicación enviando mensaje
  config(): void {

    /*///////
    // GET //
    ///////*/

    //Ejecutamos método index de controlador para enviar mensaje
    this.router.get("/", indexController.index);
    
    
    this.router.get("/logout", (req: Request, res: Response) => {
      delete req!.session!.idUserIniciado;
      delete req!.session!.nombreUserIniciado;
      console.log("Sesion cerrada");
      res.status(200).send({ message: "Sesión cerrada" });
    });

    this.router.get("/dataUser", (req: Request, res: Response) => {
      //SI EXISTE USUARIO INGRESADO SE MANDA
      if (req!.session!.nombreUserIniciado) {
        res.status(200).send({
          message: req!.session!.nombreUserIniciado,
        });
      }else{
        res.status(404).send({ message: "No hay nombre de usuario" })
      }
    });

    this.router.get("/sesionactual", (req: Request, res: Response) => {
      res.send(
        "Sesión actual como : " +
          req!.session!.idUserIniciado +
          " " +
          req!.session!.nombreUserIniciado
      );
    });

    this.router.get("/equiposUsuario", indexController.equipos);

    this.router.get("/categorias", indexController.categorias);
    this.router.get("/colaboradores", indexController.colaboradores);
    this.router.get("/colaboradoresusuario", indexController.colaboradores_usuario);
    this.router.get("/tasks", indexController.tareas);
    this.router.get("/tasksusuario", indexController.tareas_usuario);
    this.router.get("/tasksequipo", indexController.tareas_equipo);
    this.router.get("/events", indexController.eventos);
    this.router.get("/eventsusuario", indexController.eventos_usuario);

    this.router.get("/idUser", (req: Request, res: Response) => {
      //SI EXISTE USUARIO INGRESADO SE MANDA
      if (req!.session!.idUserIniciado) {
        res.status(200).send({
          message: req!.session!.idUserIniciado,
        });
      }else{
        res.status(404).send({ message: "No hay id de usuario" })
      }
    });

    this.router.get("/tutorial",indexController.tutorial);


    /*////////
    // POST //
    ////////*/

    this.router.post("/login", indexController.login);
    this.router.post("/register", indexController.register);
    this.router.post("/insertTask", indexController.addTask);
    this.router.post("/insertEvent", indexController.addEvent);
    this.router.post("/modifyTask", indexController.modTask);
    this.router.post("/modifyEvent", indexController.modEvent);


    // this.router.get('/sesion', (req:Request,res:Response)=>{
    //     res.send("Inició sesion como: "+req!.session!.sesion);
    // } );

    // this.router.get('/loginCorrecto', (req:Request,res:Response)=>{
    //     const message = 'hola';
    //     res.status(200).send({message: "Credenciales coinciden"});
    //     console.log(message);
    // } );
    // this.router.post('/view', (req:Request,res:Response)=>{
    //     //this.viewCount+=1;
    //     if(! req!.session!.viewCount){
    //         req!.session!.viewCount=1;
    //     }else{
    //         req!.session!.viewCount +=1;
    //     }
    //     req.flash('key',req!.session!.viewCount);
    //     res.redirect('/count');
    //     //res.send("Hola soy view: "+req!.session!.viewCount);
    // });
    // this.router.get('/count', (req:Request,res:Response)=>{
    //     var message = req.flash('key');
    //     console.log("Contando vistas: "+req!.session!.viewCount);
    //     res.send("Contando vistas: "+message);
    // });

    /*this.router.get('/equiposUsuario', (req: Request, res: Response) => {
      //SI EXISTE USUARIO INGRESADO SE MANDA
      res.send({ message: "No hay nombre de usuario" });
    });*/
    
  }
}

const indexRoutes = new IndexRoutes();

//Exportamos router de la clase con lo que se definió (Ruta inicial)
export default indexRoutes.router;
