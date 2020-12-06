import {Request, Response} from 'express'; //Para definir req y res

//Traemos conexión con base de datos
import pool from '../database';


class PerfilController{
    //Metodos para llevar a indexRoutes.ts
    
    //GET
   // funcion p

    //GET todos los datos del usuario ingresado
    public async datosDeIngresado(req:Request, res: Response){
        const datos = await pool.query('SELECT idColaborador,nombre,apellidos,fotoPerfil,email,fechaCreacion FROM colaborador WHERE idColaborador = ? ', req!.session!.idUserIniciado);
        res.json(datos); 
    }

    // GET amigos colaborador (donde el colaborador es quien hizo la accion de añadir al amigo)
    public async amigos(req:Request, res: Response){
        const amistades = await pool.query('SELECT colaborador.nombre,colaborador.idColaborador,colaborador.fotoPerfil,colaborador.email FROM colaborador INNER JOIN (SELECT idColaborador2 FROM amigo WHERE idColaborador1 =? AND aceptado = 1) AS amigos ON amigos.idColaborador2 = colaborador.idColaborador', [req!.session!.idUserIniciado]);
        const amistades2= await pool.query('SELECT colaborador.nombre,colaborador.idColaborador,colaborador.fotoPerfil,colaborador.email FROM colaborador INNER JOIN (SELECT idColaborador1 FROM amigo WHERE idColaborador2 = ? AND aceptado = 1) AS amigos ON amigos.idColaborador1 = colaborador.idColaborador', [req!.session!.idUserIniciado]);
        if(amistades.length>=1){
            if(amistades2.length>=1){
                const allAmistades = amistades.concat(amistades2);
                res.json(allAmistades);
            }else{
               const allAmistades = amistades;
               res.json(allAmistades);
            }
        }else{
            if(amistades2.length>=1){
               const allAmistades = amistades2;
               res.json(allAmistades);
            }else{
                const allAmistades = null;
                res.json(allAmistades);

            }
        }
    }
    public async amigos2(req:Request, res: Response){
        const { id } = req.params
        const amistades = await pool.query('SELECT colaborador.nombre,colaborador.idColaborador,colaborador.fotoPerfil,colaborador.email FROM colaborador INNER JOIN (SELECT idColaborador2 FROM amigo WHERE idColaborador1 =? AND aceptado = 1) AS amigos ON amigos.idColaborador2 = colaborador.idColaborador', [id]);
        const amistades2= await pool.query('SELECT colaborador.nombre,colaborador.idColaborador,colaborador.fotoPerfil,colaborador.email FROM colaborador INNER JOIN (SELECT idColaborador1 FROM amigo WHERE idColaborador2 = ? AND aceptado = 1) AS amigos ON amigos.idColaborador1 = colaborador.idColaborador', [id]);
        if(amistades.length>=1){
            if(amistades2.length>=1){
                const allAmistades = amistades.concat(amistades2);
                res.json(allAmistades);
            }else{
               const allAmistades = amistades;
               res.json(allAmistades);
            }
        }else{
            if(amistades2.length>=1){
               const allAmistades = amistades2;
               res.json(allAmistades);
            }else{
                const allAmistades = null;
                res.json(allAmistades);

            }
        }
    }

    // devuelve los usuarios ingresados en la busqueda, está aquí porque para llegar a esta opción solo se puede hacer mediante el
    public async buscarUsuario(req:Request, res: Response): Promise<any>{
        const Usuarios = await pool.query('SELECT * FROM colaborador WHERE nombre LIKE "%"?"%" OR email LIKE "%"?"%"',[
            req.body.nombre,
            req.body.nombre]);
        if(Usuarios.length>=1){
            res.json(Usuarios);
        }else{
            res.json(false);          
        }
        
      
    }

    //busca las solicitudes, de momento solo las de amistad
    public async obtenerSolicitudes(req:Request, res: Response){
    // qué podemos hacer aquí??????
        const solicitudes = await pool.query("SELECT * FROM colaborador INNER JOIN (SELECT idColaborador1 FROM amigo WHERE idColaborador2 =? AND aceptado =0) AS amigos ON amigos.idColaborador1 = colaborador.idColaborador",
         [req!.session!.idUserIniciado]);
        res.json(solicitudes);  
    }

    //GET ONE
    public async getAllDatos(req:Request, res: Response){
        const { id } = req.params;
        const allDatos = await pool.query('SELECT * FROM colaborador WHERE idColaborador = ?', [id]);
        res.json(allDatos);
    }

    public async comprobarAmistad(req:Request, res: Response): Promise<any>{
        const estadoAmistad = await pool.query('SELECT aceptado FROM amigo WHERE (idColaborador1 = ? AND idColaborador2 = ?) OR (idColaborador2 = ? AND idColaborador1 = ?)',[req!.session!.idUserIniciado, req.body.idColaborador2,req!.session!.idUserIniciado, req.body.idColaborador2]);
        if(estadoAmistad.length>=1){
            res.json(estadoAmistad[0].aceptado);
        }else{
            res.json(2);           
        }
    }
    
    //POST
    //crea una nueva amistad
    public async agregarAmistad(req: Request, res: Response): Promise<any> {
        await pool.query("INSERT INTO amigo (idColaborador1, idColaborador2, aceptado) VALUES (?,?,?)",
        [
            req!.session!.idUserIniciado,
            req.body.idColaborador2,
            req.body.aceptado // 0 pendiente, 1 aceptado.
        
        ]);
    
        res.json({message: "amistad eliminada"});
    }
    //DELETE
    // Elimina una amistad del usuario seleccionado, usando el id del usuario iniciado y el id del usuario objetivo
    // tambien se utiliza en el caso de rechazar una amistad
    public async eliminarAmistad(req: Request, res: Response): Promise<any> {
        const { id } = req.params
        await pool.query("DELETE FROM amigo WHERE (idColaborador1=? AND  IdColaborador2=?) OR (idColaborador2=? AND  IdColaborador1=?)",
        [
            id,
            req!.session!.idUserIniciado,
            id,
            req!.session!.idUserIniciado  
        
        ]);
        res.json({message: "amistad eliminada"});
    }
    
    //PUT
    // actualiza los datos del perfil del usuario
    public async actualizarPerfil(req:Request, res: Response){
        console.log(req.body);
        const actualizar = await pool.query('UPDATE colaborador SET nombre=? ,apellidos=? ,fotoPerfil=? WHERE colaborador.idColaborador=?',
                                    //UPDATE `colaborador` SET `nombre` = 'juanita' WHERE `colaborador`.`idColaborador` = 3;
            [
                req.body.nombre,
                req.body.apellidos,
                req.body.fotoPerfil,
                req!.session!.idUserIniciado,
            ]
        );
        req!.session!.nombreUserIniciado = req.body.nombre;
        res.json(actualizar);
    }


    //permite aceptar una amistad cambiando el campo del atributo a "1"
    public async aceptarAmistad(req:Request, res: Response): Promise<any>{
        const actualizar = await pool.query('UPDATE amigo SET aceptado=? WHERE (idColaborador1=? AND  IdColaborador2=?) OR (idColaborador1=? AND  IdColaborador2=?)',
            [
                req.body.aceptado,// 0 pendiente, 1 aceptado.
                req!.session!.idUserIniciado,
                req.body.idColaborador2,
                req.body.idColaborador2,
                req!.session!.idUserIniciado
                 
            ]
        );
        res.json({message: "amistad aceptada"});
    }

    
}

//Instanciamos clase y exportamos toda la clase
export const perfilController =  new PerfilController();