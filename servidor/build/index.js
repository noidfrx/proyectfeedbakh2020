"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importamos express y tipo de dato Application para la app
const express_1 = __importDefault(require("express"));
//Para pasar data entre rutas
const connect_flash_1 = __importDefault(require("connect-flash"));
//Importamos archivos TS para manejo de rutas
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const bodyParser = require("body-parser");
const cors = require("cors");
//Manejo de sesiones
const session = require("express-session");
const cookieParser = require("cookie-parser");
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
        this.appExpress.use(bodyParser.json());
        this.appExpress.use(cors({
            origin: [
                "http://localhost:4200"
            ],
            credentials: true
        }));
        this.appExpress.use(cookieParser());
        this.appExpress.use(session({
            secret: 'secret-key',
            resave: false,
            saveUninitialized: false,
        }));
        this.appExpress.use(connect_flash_1.default());
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
