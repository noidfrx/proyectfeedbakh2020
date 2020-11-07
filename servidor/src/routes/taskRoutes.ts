import {Router} from 'express';
import {taskController} from '../controllers/taskController';

class TaskRoutes{
    //Public: Puede ser accedido desde cualquier parte de mi clase
    public router: Router = Router();

    constructor(){
        //Al enrutador le agregamos la ruta
        this.config();
    }

    config():void{

        //GET 
        this.router.get('/categorias', taskController.categorias);
        this.router.get('/colaboradores', taskController.colaboradores);
        //this.router.get('/', taskController.equipos);
        //this.router.get("../equiposUsuario", indexController.equipos);

        //POST
        this.router.post('/', taskController.addTask);
        
    }

}

const taskRoutes = new TaskRoutes();
//Exportamos el enrutador con lo que se definió en la clase
export default taskRoutes.router;