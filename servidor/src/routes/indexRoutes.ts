import {Router} from 'express';
import {indexController} from '../controllers/indexController';

class IndexRoutes{
    //Instanciamos router
    public router:Router = Router();

    constructor(){
        //Ejecutamos config
        this.config();
    }

    //Se define ruta inicial de la aplicación enviando mensaje
    config():void{
        //Ejecutamos método index de controlador para enviar mensaje
        this.router.get('/', indexController.index);
        this.router.post('/login',indexController.login);
        this.router.post('/register',indexController.register);

    }
}

const indexRoutes = new IndexRoutes();

//Exportamos router de la clase con lo que se definió (Ruta inicial)
export default indexRoutes.router;
