import {Router} from 'express';
import {eventController} from '../controllers/eventController';

class TaskRoutes{
    //Public: Puede ser accedido desde cualquier parte de mi clase
    public router: Router = Router();

    constructor(){
        //Al enrutador le agregamos la ruta
        this.config();
    }

    config():void{

        //GET 
        this.router.get('/categorias', eventController.categorias);
        this.router.get('/colaboradores', eventController.colaboradores);

        //POST
        this.router.post('/', eventController.addEvent);
        
    }

}

const taskRoutes = new TaskRoutes();
//Exportamos el enrutador con lo que se definió en la clase
export default taskRoutes.router;