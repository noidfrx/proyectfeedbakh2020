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
    todasCredenciales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const recomendaciones = yield database_1.default.query('SELECT * FROM colaborador');
            console.log(req.session.nombreUserIniciado);
            res.json(recomendaciones);
        });
    }
    //GET todos los datos del usuario ingresado
    datosDeIngresado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const datos = yield database_1.default.query('SELECT idColaborador,nombre,apellidos,fotoPerfil,email,fechaCreacion FROM colaborador WHERE idColaborador=?', req.session.idUserIniciado);
            res.json(datos);
        });
    }
    // GET amigos colaborador
    amigos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const amistades = yield database_1.default.query('SELECT colaborador.nombre FROM colaborador INNER JOIN (SELECT idColaborador2 FROM amigo WHERE idColaborador1 = ? AND aceptado = 1) AS amigos ON amigos.idColaborador2 = colaborador.idColaborador', req.session.idUserIniciado);
            console.log(req.session.nombreUserIniciado);
            res.json(amistades);
        });
    }
}
//Instanciamos clase y exportamos toda la clase
exports.perfilController = new PerfilController();
