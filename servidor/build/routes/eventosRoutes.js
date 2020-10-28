"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class EventosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => res.send('Hello eventos!'));
    }
}
const eventosRoutes = new EventosRoutes();
exports.default = eventosRoutes.router;
