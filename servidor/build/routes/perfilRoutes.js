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
        this.router.get('/amigos2/:id', perfilController_1.perfilController.amigos2);
        this.router.get('/obtenerSolicitudes', perfilController_1.perfilController.obtenerSolicitudes);
        // //POST
        this.router.post("/comprobarAmistad", perfilController_1.perfilController.comprobarAmistad);
        this.router.post("/buscarUsuarios", perfilController_1.perfilController.buscarUsuario);
        this.router.post("/anadirAmigo", perfilController_1.perfilController.agregarAmistad); // enviar solicitud
        // //DELETE
        // no olvidar que cuando se rechaza una amistad, su equivalente es esta función
        this.router.delete("/eliminarAmigo/:id", perfilController_1.perfilController.eliminarAmistad);
        // //PUT Actualizar
        this.router.put('/actualizarPerfil', perfilController_1.perfilController.actualizarPerfil);
        this.router.put('/aceptarAmistad', perfilController_1.perfilController.aceptarAmistad);
    }
}
const perfilRoutes = new PerfilRoutes();
//Exportamos el enrutador con lo que se definió en la clase
exports.default = perfilRoutes.router;
