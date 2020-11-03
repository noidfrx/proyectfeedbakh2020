import {Router,Request, Response} from 'express';
import {indexController} from '../controllers/indexController';
import session from 'express-session';


class IndexRoutes{
    
    //Instanciamos router
    public router:Router = Router();
    //public viewCount:number;

    constructor(){
        //Ejecutamos config
        this.config();
        //this.viewCount=0;

    }

    //Se define ruta inicial de la aplicación enviando mensaje
    config():void{
        //Ejecutamos método index de controlador para enviar mensaje
        this.router.get('/', indexController.index);
        this.router.post('/login',indexController.login);
        this.router.get('/logout', (req:Request,res:Response)=>{
            delete req!.session!.idUserIniciado;
            console.log("Sesion cerrada");
            res.status(200).send({message:"Sesión cerrada"});
        });
        this.router.post('/register',indexController.register);
        this.router.get('/sesionactual', (req:Request, res:Response)=>{
            res.send("Sesión actual como id: "+req!.session!.idUserIniciado);
        });
        
        // this.router.get('/sesion', (req:Request,res:Response)=>{
        //     res.send("Inició sesion como: "+req!.session!.sesion);
        // } );


        // this.router.get('/loginCorrecto', (req:Request,res:Response)=>{
        //     const message = 'hola';
        //     res.status(200).send({message: "Credenciales coinciden"});
        //     console.log(message);
        // } );
        // this.router.post('/view', (req:Request,res:Response)=>{
        //     //this.viewCount+=1;
        //     if(! req!.session!.viewCount){
        //         req!.session!.viewCount=1;
        //     }else{
        //         req!.session!.viewCount +=1;
        //     }
        //     req.flash('key',req!.session!.viewCount);
        //     res.redirect('/count');
        //     //res.send("Hola soy view: "+req!.session!.viewCount);
        // });
        // this.router.get('/count', (req:Request,res:Response)=>{
        //     var message = req.flash('key');
        //     console.log("Contando vistas: "+req!.session!.viewCount);
        //     res.send("Contando vistas: "+message);
        // });

    }

}

const indexRoutes = new IndexRoutes();

//Exportamos router de la clase con lo que se definió (Ruta inicial)
export default indexRoutes.router;
