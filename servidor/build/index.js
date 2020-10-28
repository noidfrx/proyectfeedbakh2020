"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importamos express y tipo de dato Application para la app
const express_1 = __importDefault(require("express"));
//Importamos archivos TS para manejo de rutas
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.appExpress = express_1.default();
        //Configuramos app de express con métodos propios
        this.config();
        this.routes();
    }
    //Método de configuración conexión
    config() {
        //Usa puerto 3000 di no nos dan puerto definido
        this.appExpress.set('port', process.env.PORT || 3000);
    }
    //Configuración de rutas para el servidor
    routes() {
        //Usaremos rutas importadas (import archivos ts al inicio)
        this.appExpress.use(body_parser_1.default.json());
        this.appExpress.use(cors_1.default());
        this.appExpress.use('/', indexRoutes_1.default);
    }
    //Conexión a servidor
    start() {
        //Obtenemos valor de variable seteada en config 'port' inicializamos con mensaje
        this.appExpress.listen(this.appExpress.get('port'), () => {
            console.log('Servidor funcionando en http://localhost:' + this.appExpress.get('port'));
        });
    }
}
const server = new Server();
server.start(); //Inicializamos servidor
