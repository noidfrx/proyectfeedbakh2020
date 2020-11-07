"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventController_1 = require("../controllers/eventController");
class TaskRoutes {
    constructor() {
        //Public: Puede ser accedido desde cualquier parte de mi clase
        this.router = express_1.Router();
        //Al enrutador le agregamos la ruta
        this.config();
    }
    config() {
        //GET 
        this.router.get('/categorias', eventController_1.eventController.categorias);
        this.router.get('/colaboradores', eventController_1.eventController.colaboradores);
        //POST
        this.router.post('/', eventController_1.eventController.addEvent);
    }
}
const taskRoutes = new TaskRoutes();
//Exportamos el enrutador con lo que se definió en la clase
exports.default = taskRoutes.router;
