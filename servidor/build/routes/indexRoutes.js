"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
class IndexRoutes {
    //public viewCount:number;
    constructor() {
        //Instanciamos router
        this.router = express_1.Router();
        //Ejecutamos config
        this.config();
        //this.viewCount=0;
    }
    //Se define ruta inicial de la aplicación enviando mensaje
    config() {
        /*///////
        // GET //
        ///////*/
        //Ejecutamos método index de controlador para enviar mensaje
        this.router.get("/", indexController_1.indexController.index);
        this.router.get("/logout", (req, res) => {
            delete req.session.idUserIniciado;
            delete req.session.nombreUserIniciado;
            console.log("Sesion cerrada");
            res.status(200).send({ message: "Sesión cerrada" });
        });
        this.router.get("/dataUser", (req, res) => {
            //SI EXISTE USUARIO INGRESADO SE MANDA
            if (req.session.nombreUserIniciado) {
                res.status(200).send({
                    message: req.session.nombreUserIniciado,
                });
            }
            else {
                res.status(404).send({ message: "No hay nombre de usuario" });
            }
        });
        this.router.get("/sesionactual", (req, res) => {
            res.send("Sesión actual como : " +
                req.session.idUserIniciado +
                " " +
                req.session.nombreUserIniciado);
        });
        this.router.get("/equiposUsuario", indexController_1.indexController.equipos);
        this.router.get("/categorias", indexController_1.indexController.categorias);
        this.router.get("/colaboradores", indexController_1.indexController.colaboradores);
        this.router.get("/colaboradoresusuario", indexController_1.indexController.colaboradores_usuario);
        this.router.get("/tasks", indexController_1.indexController.tareas);
        this.router.get("/tasksusuario", indexController_1.indexController.tareas_usuario);
        this.router.get("/tasksequipo", indexController_1.indexController.tareas_equipo);
        this.router.get("/events", indexController_1.indexController.eventos);
        this.router.get("/eventsusuario", indexController_1.indexController.eventos_usuario);
        this.router.get("/idUser", (req, res) => {
            //SI EXISTE USUARIO INGRESADO SE MANDA
            if (req.session.idUserIniciado) {
                res.status(200).send({
                    message: req.session.idUserIniciado,
                });
            }
            else {
                res.status(404).send({ message: "No hay id de usuario" });
            }
        });
        this.router.get("/tutorial", indexController_1.indexController.tutorial);
        /*////////
        // POST //
        ////////*/
        this.router.post("/login", indexController_1.indexController.login);
        this.router.post("/register", indexController_1.indexController.register);
        this.router.post("/insertTask", indexController_1.indexController.addTask);
        this.router.post("/insertEvent", indexController_1.indexController.addEvent);
        this.router.post("/modifyTask", indexController_1.indexController.modTask);
        this.router.post("/modifyEvent", indexController_1.indexController.modEvent);
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
exports.default = indexRoutes.router;
