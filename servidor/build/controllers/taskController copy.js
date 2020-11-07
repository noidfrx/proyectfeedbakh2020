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
exports.taskController = void 0;
const database_1 = __importDefault(require("../database"));
class TaskController {
    index(req, res) {
        res.send("Hello from taskController");
    }
    /*  Se agrega una nueva tarea segun los datos
        ingresados en el formulario /taskmaker
    */
    addTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            // Query para agregar tarea
            yield database_1.default.query("INSERT INTO tarea (nombre, fecha, descripcion, idCategoria, idEquipo) VALUES (?,?,?,?,?)", [
                req.body.nombre,
                req.body.anio + "-" + req.body.mes + "-" + req.body.dia,
                req.body.descripcion,
                req.body.categoria,
                req.body.equipo
            ]);
            res.status(200).json({ message: "Tarea guardada" });
        });
    }
    /* Pide los equipos a los que pertenezca el usuario logeado y retorna todos los datos:
       Nombre del Equipo, las tareas y eventos vinculadas a ese equipo con la fecha y la categoría
       
       Se crea un arreglo tipo:
       [Equipo:{
         nombre,
         {tareas: {nombre, categoria}},
         {evento: {nombre, categoria}}
        }]
       */
    categorias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let listaCategorias = [];
            let nombreCategoria;
            let idCategoria;
            const datos = yield database_1.default.query("SELECT * FROM categoria");
            if (datos.length >= 1) {
                let aux = 0;
                for (let categoria of datos) {
                    nombreCategoria = yield database_1.default.query("SELECT nombreCategoria FROM categoria WHERE idCategoria=?", [categoria.idCategoria]);
                    idCategoria = yield database_1.default.query("SELECT idCategoria FROM categoria WHERE idCategoria=?", [categoria.idCategoria]);
                    listaCategorias[aux] = { nombreCategoria, idCategoria };
                    aux = aux + 1;
                }
                res.status(200).json(listaCategorias);
            }
            else {
                res.status(204).send({ message: "No se adquirieron categorias" });
            }
        });
    }
    colaboradores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let listaColaboradores = [];
            let nombreColaborador;
            let apellidosColaborador;
            let idColaborador;
            const datos = yield database_1.default.query("SELECT * FROM colaborador");
            if (datos.length >= 1) {
                let aux = 0;
                for (let colaborador of datos) {
                    nombreColaborador = yield database_1.default.query("SELECT nombre FROM colaborador WHERE idColaborador=?", [colaborador.idColaborador]);
                    apellidosColaborador = yield database_1.default.query("SELECT apellidos FROM colaborador WHERE idColaborador=?", [colaborador.idColaborador]);
                    idColaborador = yield database_1.default.query("SELECT idColaborador FROM colaborador WHERE idColaborador=?", [colaborador.idColaborador]);
                    listaColaboradores[aux] = { nombreColaborador, apellidosColaborador, idColaborador };
                    aux = aux + 1;
                }
                res.status(200).json(listaColaboradores);
            }
            else {
                res.status(204).send({ message: "No se adquirieron colaboradores" });
            }
        });
    }
}
//Instanciamos y exportamos toda la clase
exports.taskController = new TaskController();
