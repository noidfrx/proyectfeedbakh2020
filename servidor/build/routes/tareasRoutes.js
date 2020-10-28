"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class TareasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Definimos ruta tareas
        this.router.get('/', (req, res) => res.send('Hello tareas!'));
    }
}
const tareasRoutes = new TareasRoutes();
exports.default = tareasRoutes.router; //Exportamos enrutador con ruta
