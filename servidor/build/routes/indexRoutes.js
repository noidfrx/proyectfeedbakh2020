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
        //Ejecutamos método index de controlador para enviar mensaje
        this.router.get('/', indexController_1.indexController.index);
        this.router.post('/login', indexController_1.indexController.login);
        this.router.get('/logout', (req, res) => {
            delete req.session.idUserIniciado;
            console.log("Sesion cerrada");
            res.status(200).send({ message: "Sesión cerrada" });
        });
        this.router.post('/register', indexController_1.indexController.register);
        this.router.get('/sesionactual', (req, res) => {
            res.send("Sesión actual como id: " + req.session.idUserIniciado);
        });
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
    }
}
const indexRoutes = new IndexRoutes();
//Exportamos router de la clase con lo que se definió (Ruta inicial)
exports.default = indexRoutes.router;
