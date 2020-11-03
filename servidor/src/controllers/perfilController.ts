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

    //GET ONE
    
    //POST
    
    //DELETE
    
    //PUT
    
}

//Instanciamos clase y exportamos toda la clase
export const perfilController =  new PerfilController();