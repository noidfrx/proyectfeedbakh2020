"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const perfilController_1 = require("../controllers/perfilController");
class PerfilRoutes {
    constructor() {
        //Public: Puede ser accedido desde cualquier parte de mi clase
        this.router = express_1.Router();
        //Al enrutador le agregamos la ruta
        this.config();
    }
    config() {
        // //GET Definimos ruta inicial de aplicación, se devuelve mensaje hello
        this.router.get('/todas', perfilController_1.perfilController.todasCredenciales);
        //GET Datos de usuario ingresado
        this.router.get('/datosIngresado', perfilController_1.perfilController.datosDeIngresado);
        // //POST
        // //DELETE Se utiliza ID de recomendación
        // //PUT Actualizar, se utiliza ID de recomendación
    }
}
const perfilRoutes = new PerfilRoutes();
//Exportamos el enrutador con lo que se definió en la clase
exports.default = perfilRoutes.router;
