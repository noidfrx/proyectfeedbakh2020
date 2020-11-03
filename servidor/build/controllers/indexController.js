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
exports.indexController = void 0;
const database_1 = __importDefault(require("../database"));
class IndexController {
    index(req, res) {
        res.send("Hello from indexController");
    }
    //Se registra nuevo usuario
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            // Comprobamos contraseñas iguales
            if (req.body.password == req.body.repetirPassword) {
                //Se crea objeto en COLABORADOR
                yield database_1.default.query("INSERT INTO colaborador (nombre, apellidos, email, password) VALUES (?,?,?,?)", [
                    req.body.nombre,
                    req.body.apellidoPaterno + " " + req.body.apellidoMaterno,
                    req.body.email,
                    req.body.password,
                ]);
                res.json({ message: "Colaborador guardado" });
            }
            else {
                res.status(401).send({ message: "Las contraseñas son iguales" });
            }
        });
    }
    //Se comprueba que exista el usuario
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Hacer validaciones con req.body.email req.body.password
            const email = req.body.email;
            const password = req.body.password;
            //Obtenemos objetos con los valores de petición
            const datoComprobacion = yield database_1.default.query("SELECT * FROM colaborador WHERE email=? AND password=?", [email, password]);
            //Cuando hay un dato que coincide con el email y la contraseña
            if (datoComprobacion.length == 1) {
                //Cuando todo sale bien se manda código de OK
                const idDatoComprobacion = yield database_1.default.query("SELECT idColaborador FROM colaborador WHERE email=? AND password=?", [email, password]);
                if (!req.session.viewCount) {
                    req.session.viewCount = 1;
                }
                else {
                    req.session.viewCount += 1;
                }
                req.session.idUserIniciado = idDatoComprobacion[0].idColaborador;
                req.session.nombreUserIniciado = datoComprobacion[0].nombre;
                console.log("Sesión iniciada como: " + req.session.idUserIniciado + " " + req.session.nombreUserIniciado);
                console.log("Veces iniciadas en el dispositivo: " + req.session.viewCount);
                res.status(200).send({
                    id: idDatoComprobacion[0].idColaborador,
                    nombre: datoComprobacion[0].nombre,
                    apellidoPaterno: datoComprobacion[0].apellidoPaterno,
                    message: datoComprobacion[0]
                });
                //res.redirect("/loginCorrecto");
            }
            else {
                res.status(401).send({ message: "Credenciales no coinciden" });
            }
        });
    }
}
//Instanciamos y exportamos toda la clase
exports.indexController = new IndexController();
