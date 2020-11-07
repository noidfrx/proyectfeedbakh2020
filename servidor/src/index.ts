//Importamos express y tipo de dato Application para la app
import express, {Application} from 'express';

//Para pasar data entre rutas
import flash from 'connect-flash';

//Importamos archivos TS para manejo de rutas
import indexRoutes from './routes/indexRoutes';
import perfilRoutes from './routes/perfilRoutes';
import taskRoutes from './routes/taskRoutes';
import eventRoutes from './routes/eventRoutes';

import bodyParser = require('body-parser');
import cors = require('cors'); 

//Manejo de sesiones
import session = require('express-session');
import cookieParser = require('cookie-parser');

class Server{
    public appExpress : Application;

    constructor(){
        this.appExpress = express();
        
        //Configuramos app de express con métodos propios
        this.config();
        this.routes();
    }

    //Método de configuración conexión
    config():void{
        //Usa puerto 3000 di no nos dan puerto definido
        this.appExpress.set('port', process.env.PORT || 3000);
    }

    //Configuración de rutas para el servidor
    routes():void{
        //Usaremos rutas importadas (import archivos ts al inicio)
        
        this.appExpress.use(bodyParser.json());
        this.appExpress.use(cors({
            origin:[
                "http://localhost:4200"
            ],
            credentials:true
        }));
        this.appExpress.use(cookieParser());
        this.appExpress.use(session({
            secret: 'secret-key',
            resave: false,
            saveUninitialized: false,
        }));
        this.appExpress.use(flash());
        this.appExpress.use('/', indexRoutes);
        this.appExpress.use('/perfil', perfilRoutes);
        this.appExpress.use('/taskmaker', taskRoutes);
        this.appExpress.use('/eventmaker', eventRoutes);
        
        
    }

    //Conexión a servidor
    start():void{
        //Obtenemos valor de variable seteada en config 'port' inicializamos con mensaje
        this.appExpress.listen(this.appExpress.get('port'), 
        ()=>{
            console.log('Servidor funcionando en http://localhost:'+this.appExpress.get('port'))
        });
    }
}

const server = new Server();
server.start(); //Inicializamos servidor