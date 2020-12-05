"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.perfilController = void 0;
//Traemos conexión con base de datos
const database_1 = __importDefault(require("../database"));
class PerfilController {
    //Metodos para llevar a indexRoutes.ts
    //GET
    // funcion p
    //GET todos los datos del usuario ingresado
    datosDeIngresado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const datos = yield database_1.default.query('SELECT idColaborador,nombre,apellidos,fotoPerfil,email,fechaCreacion FROM colaborador WHERE idColaborador = ? ', req.session.idUserIniciado);
            res.json(datos);
        });
    }
    // GET amigos colaborador (donde el colaborador es quien hizo la accion de añadir al amigo)
    amigos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const amistades = yield database_1.default.query('SELECT colaborador.nombre,colaborador.idColaborador FROM colaborador INNER JOIN (SELECT idColaborador2 FROM amigo WHERE idColaborador1 =? AND aceptado =1) AS amigos ON amigos.idColaborador2 = colaborador.idColaborador', req.session.idUserIniciado);
            //  console.log(amistades);
            res.json(amistades);
        });
    }
    // GET amigos colaborador (donde el colaborador es a quien le han enviado la invitación), es lo mismo de arriba pero con las credenciales dadas vueltas en la lista de amigos
    amigosV2(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const amistades2 = yield database_1.default.query('SELECT colaborador.nombre FROM colaborador INNER JOIN (SELECT idColaborador1 FROM amigo WHERE idColaborador2 = ? AND aceptado = 1) AS amigos ON amigos.idColaborador1 = colaborador.idColaborador', req.session.idUserIniciado);
            //console.log(req!.session!.nombreUserIniciado);
            res.json(amistades2);
            // console.log(req!.session!.idUserIniciado);
        });
    }
    // devuelve los usuarios ingresados en la busqueda, está aquí porque para llegar a esta opción solo se puede hacer mediante el
    buscarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const Usuarios = yield database_1.default.query('SELECT * FROM colaborador WHERE nombre LIKE "%"?"%" OR email LIKE "%"?"%"', [
                req.body.nombre,
                req.body.nombre
            ]);
            if (Usuarios.length >= 1) {
                res.json(Usuarios);
            }
            else {
                res.json(false);
            }
        });
    }
    //busca las solicitudes, de momento solo las de amistad
    obtenerSolicitudes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // qué podemos hacer aquí??????
            const solicitudes = yield database_1.default.query("SELECT * FROM colaborador INNER JOIN (SELECT idColaborador1 FROM amigo WHERE idColaborador2 =? AND aceptado =0) AS amigos ON amigos.idColaborador1 = colaborador.idColaborador", [req.session.idUserIniciado]);
            res.json(solicitudes);
        });
    }
    //GET ONE
    getAllDatos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const allDatos = yield database_1.default.query('SELECT * FROM colaborador WHERE idColaborador = ?', [id]);
            res.json(allDatos);
        });
    }
    comprobarAmistad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const estadoAmistad = yield database_1.default.query('SELECT aceptado FROM amigo WHERE (idColaborador1 = ? AND idColaborador2 = ?) OR (idColaborador2 = ? AND idColaborador1 = ?)', [req.session.idUserIniciado, req.body.idColaborador2, req.session.idUserIniciado, req.body.idColaborador2]);
            if (estadoAmistad.length >= 1) {
                res.json(estadoAmistad[0].aceptado);
            }
            else {
                res.json(2);
            }
        });
    }
    //POST
    //crea una nueva amistad
    agregarAmistad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("INSERT INTO amigo (idColaborador1, idColaborador2, aceptado) VALUES (?,?,?)", [
                req.session.idUserIniciado,
                req.body.idColaborador2,
                req.body.aceptado // 0 pendiente, 1 aceptado.
            ]);
            res.json({ message: "amistad eliminada" });
        });
    }
    //DELETE
    // Elimina una amistad del usuario seleccionado, usando el id del usuario iniciado y el id del usuario objetivo
    // tambien se utiliza en el caso de rechazar una amistad
    eliminarAmistad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("DELETE FROM amigo WHERE (idColaborador1=? AND  IdColaborador2=?) OR (idColaborador2=? AND  IdColaborador1=?)", [
                id,
                req.session.idUserIniciado,
                id,
                req.session.idUserIniciado
            ]);
            res.json({ message: "amistad eliminada" });
        });
    }
    //PUT
    // actualiza los datos del perfil del usuario
    actualizarPerfil(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const actualizar = yield database_1.default.query('UPDATE colaborador SET nombre=? ,apellidos=? ,fotoPerfil=0 WHERE idcolaborador=?', [
                req.body.nombre,
                req.body.apellidos,
                req.body.fotoPerfil,
                req.session.idUserIniciado,
            ]);
            res.json(actualizar);
        });
    }
    //permite aceptar una amistad cambiando el campo del atributo a "1"
    aceptarAmistad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("el id del user a cambiar es: ", req.body.idColaborador2);
            const actualizar = yield database_1.default.query('UPDATE amigo SET aceptado=? WHERE (idColaborador1=? AND  IdColaborador2=?) OR (idColaborador1=? AND  IdColaborador2=?)', [
                req.body.aceptado,
                req.session.idUserIniciado,
                req.body.idColaborador2,
                req.body.idColaborador2,
                req.session.idUserIniciado
            ]);
            res.json({ message: "amistad aceptada" });
        });
    }
}
//Instanciamos clase y exportamos toda la clase
exports.perfilController = new PerfilController();
