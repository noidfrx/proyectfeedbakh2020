"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
class TaskRoutes {
    constructor() {
        //Public: Puede ser accedido desde cualquier parte de mi clase
        this.router = express_1.Router();
        //Al enrutador le agregamos la ruta
        this.config();
    }
    config() {
        //GET 
        this.router.get('/categorias', taskController_1.taskController.categorias);
        this.router.get('/colaboradores', taskController_1.taskController.colaboradores);
        //this.router.get('/', taskController.equipos);
        //this.router.get("../equiposUsuario", indexController.equipos);
        //POST
        this.router.post('/', taskController_1.taskController.addTask);
    }
}
const taskRoutes = new TaskRoutes();
//Exportamos el enrutador con lo que se definió en la clase
exports.default = taskRoutes.router;
