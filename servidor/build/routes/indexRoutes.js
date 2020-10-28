"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
class IndexRoutes {
    constructor() {
        //Instanciamos router
        this.router = express_1.Router();
        //Ejecutamos config
        this.config();
    }
    //Se define ruta inicial de la aplicación enviando mensaje
    config() {
        //Ejecutamos método index de controlador para enviar mensaje
        this.router.get('/', indexController_1.indexController.index);
        this.router.post('/login', indexController_1.indexController.login);
        this.router.post('/register', indexController_1.indexController.register);
    }
}
const indexRoutes = new IndexRoutes();
//Exportamos router de la clase con lo que se definió (Ruta inicial)
exports.default = indexRoutes.router;
