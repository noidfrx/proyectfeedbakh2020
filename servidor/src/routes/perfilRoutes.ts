import {Router} from 'express';
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


        // //POST

        // //DELETE Se utiliza ID de recomendación

        // //PUT Actualizar, se utiliza ID de recomendación
    }

}

const perfilRoutes = new PerfilRoutes();
//Exportamos el enrutador con lo que se definió en la clase
export default perfilRoutes.router;