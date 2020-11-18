import {Request, Response} from 'express'; //Para definir req y res

//Traemos conexión con base de datos
import pool from '../database';


class PerfilController{
    //Metodos para llevar a indexRoutes.ts
    
    //GET
    public async todasCredenciales(req:Request, res: Response){
        const recomendaciones = await pool.query('SELECT * FROM colaborador');
        console.log(req!.session!.nombreUserIniciado);
        res.json(recomendaciones);
    }

    //GET todos los datos del usuario ingresado
    public async datosDeIngresado(req:Request, res: Response){
        const datos = await pool.query('SELECT idColaborador,nombre,apellidos,fotoPerfil,email,fechaCreacion FROM colaborador WHERE idColaborador=?', req!.session!.idUserIniciado);
        res.json(datos);
        
    }

    // GET amigos colaborador (donde el colaborador es quien hizo la accion de añadir al amigo)
    public async amigos(req:Request, res: Response){
        const amistades = await pool.query('SELECT colaborador.nombre FROM colaborador INNER JOIN (SELECT idColaborador2 FROM amigo WHERE idColaborador1 = ? AND aceptado = 1) AS amigos ON amigos.idColaborador2 = colaborador.idColaborador', req!.session!.idUserIniciado);
        console.log(req!.session!.nombreUserIniciado);
        res.json(amistades);
    }

    // GET amigos colaborador (donde el colaborador es a quien le han enviado la invitación), es lo mismo de arriba pero con las credenciales dadas vueltas en la lista de amigos
    public async amigosV2(req:Request, res: Response){
        const amistades2 = await pool.query('SELECT colaborador.nombre FROM colaborador INNER JOIN (SELECT idColaborador1 FROM amigo WHERE idColaborador2 = ? AND aceptado = 1) AS amigos ON amigos.idColaborador1 = colaborador.idColaborador', req!.session!.idUserIniciado);
        console.log(req!.session!.nombreUserIniciado);
        res.json(amistades2);
        console.log(req!.session!.idUserIniciado);
    }


    //GET ONE
    
    //POST
    
    //DELETE
    
    //PUT
    // actualiza los datos del perfil del usuario
    public async actualizarPerfil(req:Request, res: Response){
        console.log(req.body);
        const actualizar = await pool.query('UPDATE colaborador SET nombre=? ,apellidos=? ,fotoPerfil=0 WHERE idcolaborador=?',
            [
                req.body.nombre,
                req.body.apellidos,
                req.body.fotoPerfil,
                req!.session!.idUserIniciado,
            ]
        );
        console.log(req!.session!.nombreUserIniciado); 
        res.json(actualizar);
        console.log(req!.session!.idUserIniciado);
    }
}

//Instanciamos clase y exportamos toda la clase
export const perfilController =  new PerfilController();