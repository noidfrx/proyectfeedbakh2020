//Importamos express y tipo de dato Application para la app
import express, {Application} from 'express';

//Importamos archivos TS para manejo de rutas
import indexRoutes from './routes/indexRoutes';
import bodyParser from 'body-parser';
import cors from 'cors'; 

//Manejo de sesiones
import session from 'express-session';

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
        this.appExpress.use(cors());
        this.appExpress.use('/', indexRoutes);
        
        
        

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