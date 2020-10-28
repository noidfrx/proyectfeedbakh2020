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
            yield database_1.default.query("INSERT INTO credencial (email,password) VALUES (?,?)", [req.body.email, req.body.password]);
            res.json({ message: 'Credencial guardada' });
        });
    }
    //Se comprueba que exista el usuario
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Hacer validaciones con req.body.email req.body.password
            const email = req.body.email;
            const password = req.body.password;
            const datoComprobacion = yield database_1.default.query("SELECT * FROM credencial WHERE email=? AND password=?", [email, password]);
            console.log(datoComprobacion);
            console.log(datoComprobacion.length);
            if (datoComprobacion.length == 1) {
                //Cuando todo sale bien se manda código de OK
                res.status(200).send({ message: "Autenticación OK" });
            }
        });
    }
}
//Instanciamos y exportamos toda la clase
exports.indexController = new IndexController();
