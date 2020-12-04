import {Router, Request, Response} from 'express';
import {perfilController} from '../controllers/perfilController';

class PerfilRoutes{
    //Public: Puede ser accedido desde cualquier parte de mi clase
    public router: Router = Router();

    constructor(){
        //Al enrutador le agregamos la ruta
        this.config();
    }

    config():void{

        // //GET Definimos ruta inicial de aplicación, se devuelve mensaje hello

        this.router.get('/todosLosDatos/:id', perfilController.getAllDatos);

        //GET Datos de usuario ingresado
        this.router.get('/datosIngresado', perfilController.datosDeIngresado);

        this.router.get('/amigos', perfilController.amigos);

        this.router.get('/amigos2',perfilController.amigosV2);

        this.router.get('/obtenerSolicitudes',perfilController.obtenerSolicitudes);

        


        // //POST
        this.router.post("/comprobarAmistad",perfilController.comprobarAmistad);

        this.router.post("/buscarUsuarios",perfilController.buscarUsuario);

        this.router.post("/anadirAmigo",perfilController.agregarAmistad); // enviar solicitud
        

        // //DELETE

        // no olvidar que cuando se rechaza una amistad, su equivalente es esta función
        this.router.delete("/eliminarAmigo/:id",perfilController.eliminarAmistad); 

        // //PUT Actualizar
        this.router.put('/actualizarPerfil',perfilController.actualizarPerfil);

        this.router.put("/aceptarAmistad",perfilController.aceptarAmistad);
    }

}

const perfilRoutes = new PerfilRoutes();
//Exportamos el enrutador con lo que se definió en la clase
export default perfilRoutes.router;