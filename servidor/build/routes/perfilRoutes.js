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
        this.router.get('/todosLosDatos/:id', perfilController_1.perfilController.getAllDatos);
        //GET Datos de usuario ingresado
        this.router.get('/datosIngresado', perfilController_1.perfilController.datosDeIngresado);
        this.router.get('/amigos', perfilController_1.perfilController.amigos);
        this.router.get('/amigos2', perfilController_1.perfilController.amigosV2);
        // //POST
        this.router.post("/comprobarAmistad", perfilController_1.perfilController.comprobarAmistad);
        this.router.post("/buscarUsuarios", perfilController_1.perfilController.buscarUsuario);
        // //DELETE
        // //PUT Actualizar
        this.router.put('/actualizarPerfil', perfilController_1.perfilController.actualizarPerfil);
    }
}
const perfilRoutes = new PerfilRoutes();
//Exportamos el enrutador con lo que se definió en la clase
exports.default = perfilRoutes.router;
