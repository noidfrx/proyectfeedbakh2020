"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const credencialesController_1 = require("../controllers/credencialesController");
class CredencialesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //SE DEFINEN RUTAS PARA CRUD
        //GETONE
        this.router.post('/', credencialesController_1.credencialesController.getOne);
        //POST
        this.router.get('/', credencialesController_1.credencialesController.post);
        //DELETE
        this.router.get('/:id', credencialesController_1.credencialesController.delete);
        //PUT
        this.router.get('/:id', credencialesController_1.credencialesController.put);
    }
}
const credencialesRoutes = new CredencialesRoutes();
exports.default = credencialesRoutes.router;
