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

        this.router.get('/todas', perfilController.todasCredenciales);

        //GET Datos de usuario ingresado
        this.router.get('/datosIngresado', perfilController.datosDeIngresado);

        this.router.get('/amigos', perfilController.amigos);

        this.router.get('/amigos2',perfilController.amigosV2);

        


        // //POST

        // //DELETE Se utiliza ID de recomendación

        // //PUT Actualizar, se utiliza ID de recomendación
        this.router.put('/actualizarPerfil',perfilController.actualizarPerfil);
    }

}

const perfilRoutes = new PerfilRoutes();
//Exportamos el enrutador con lo que se definió en la clase
export default perfilRoutes.router;