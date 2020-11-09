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
    /* Pide los equipos a los que pertenezca el usuario logeado y retorna todos los datos:
       Nombre del Equipo, las tareas y eventos vinculadas a ese equipo con la fecha y la categoría
       
       Se crea un arreglo tipo:
       [Equipo:{
         nombre,
         {tareas: {nombre, categoria}},
         {evento: {nombre, categoria}}
        }]
       */
    equipos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let vistaEquipos = [];
            let tareas;
            let eventos;
            const datos = yield database_1.default.query("SELECT * FROM listaequipo WHERE idColaborador=?", [req.session.idUserIniciado]);
            if (datos.length >= 1) {
                let aux = 0;
                for (let equipo of datos) {
                    const nombreEquipo = yield database_1.default.query("SELECT nombre,idEquipo FROM equipo WHERE idEquipo = ?", [equipo.idEquipo]);
                    if (equipo.encargado) {
                        tareas = yield database_1.default.query("SELECT tarea.nombre, DATE_FORMAT(tarea.fecha, '%d/%m/%Y') AS date, categoria.nombreCategoria FROM tarea INNER JOIN categoria ON tarea.idCategoria = categoria.idCategoria AND idEquipo = ? ORDER BY date LIMIT 5", [equipo.idEquipo]);
                        eventos = yield database_1.default.query("SELECT evento.nombre, DATE_FORMAT(evento.fecha, '%d/%m/%Y') AS date, categoria.nombreCategoria FROM evento INNER JOIN categoria ON evento.idCategoria = categoria.idCategoria AND idEquipo = ? ORDER BY date LIMIT 5", [equipo.idEquipo]);
                    }
                    else {
                        tareas = yield database_1.default.query("SELECT sincategorias.nombre, sincategorias.fecha AS date, categoria.nombreCategoria FROM categoria INNER JOIN (SELECT tarea.nombre, DATE_FORMAT(tarea.fecha, '%d-%m-%Y') AS fecha, tarea.idCategoria FROM tarea INNER JOIN (SELECT idTarea FROM listatareas WHERE idColaborador = ?) AS tareaspersonales ON tarea.idTarea = tareaspersonales.idTarea AND tarea.idEquipo = ? ) AS sincategorias ON categoria.idCategoria = sincategorias.idCategoria ORDER BY date LIMIT 5", [req.session.idUserIniciado, equipo.idEquipo]);
                        eventos = yield database_1.default.query("SELECT sincategorias.nombre, sincategorias.fecha AS date, categoria.nombreCategoria FROM categoria INNER JOIN (SELECT evento.nombre, DATE_FORMAT(evento.fecha, '%d-%m-%Y') AS fecha, evento.idCategoria FROM evento INNER JOIN (SELECT idEvento FROM listaeventos WHERE idColaborador = ?) AS eventospersonales ON evento.idEvento = eventospersonales.idEvento AND evento.idEquipo = ? ) AS sincategorias ON categoria.idCategoria = sincategorias.idCategoria ORDER BY date LIMIT 5", [req.session.idUserIniciado, equipo.idEquipo]);
                    }
                    vistaEquipos[aux] = { nombreEquipo, tareas, eventos };
                    aux = aux + 1;
                }
                res.status(200).json(vistaEquipos);
            }
            else {
                res.status(204).send({ message: "No hay equipos para el Usuario Ingresado" });
            }
        });
    }
    /*  Query para agregar una nueva tarea
     /  implementado en /components/task-add
    */
    addTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
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
    /*  Query para modificar una tarea
     /  implementado en /components/task-mod
    */
    modTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.default.query("UPDATE tarea SET nombre=?, fecha=?, descripcion=?, idCategoria=?, idEquipo=? WHERE idTarea=?", [
                req.body.nombre,
                req.body.anio + "-" + req.body.mes + "-" + req.body.dia,
                req.body.descripcion,
                req.body.categoria,
                req.body.equipo,
                req.body.tarea
            ]);
            res.status(200).json({ message: "Tarea modificada" });
        });
    }
    /*  Query para agregar una nuevo evento
     /  implementado en /components/event-add
    */
    addEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.default.query("INSERT INTO evento (nombre, fecha, hora, descripcion, idCategoria, idEquipo, enlaceVideoconferencia, privacidad) VALUES (?,?,?,?,?,?,?,?)", [
                req.body.nombre,
                req.body.anio + "-" + req.body.mes + "-" + req.body.dia,
                req.body.hora + ":" + req.body.minuto,
                req.body.descripcion,
                req.body.categoria,
                req.body.equipo,
                req.body.enlace,
                req.body.privacidad
            ]);
            res.status(200).json({ message: "Evento guardado" });
        });
    }
    /*  Query para modificar un evento
     /  implementado en /components/event-mod
    */
    modEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.default.query("UPDATE evento SET nombre=?, fecha=?, hora=?, descripcion=?, idCategoria=?, idEquipo=?, enlaceVideoconferencia=?, privacidad=? WHERE idEvento=?", [
                req.body.nombre,
                req.body.anio + "-" + req.body.mes + "-" + req.body.dia,
                req.body.hora + ":" + req.body.minuto,
                req.body.descripcion,
                req.body.categoria,
                req.body.equipo,
                req.body.enlace,
                req.body.privacidad,
                req.body.evento
            ]);
            res.status(200).json({ message: "Evento modificado" });
        });
    }
    /*  Query para obtener una lista de todas las categorias
     /  implementado en /components/task-add, /components/event-add, /components/team-view
     /  /components/task-mod, /components/event-mod
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
    /*  Query para obtener una lista de colaboradores (todos, por ahora)
     /  implementado en /components/task-add, /components/event-add, /components/team-view
     /  /components/task-mod, /components/event-mod
    */
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
    tareas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let listaTareas = [];
            let nombre;
            let id;
            const datos = yield database_1.default.query("SELECT * FROM tarea");
            if (datos.length >= 1) {
                let aux = 0;
                for (let tarea of datos) {
                    nombre = yield database_1.default.query("SELECT nombre FROM tarea WHERE idTarea=?", [tarea.idTarea]);
                    id = yield database_1.default.query("SELECT idTarea FROM tarea WHERE idTarea=?", [tarea.idTarea]);
                    listaTareas[aux] = { nombre, id };
                    aux = aux + 1;
                }
                res.status(200).json(listaTareas);
            }
            else {
                res.status(204).send({ message: "No se adquirieron tareas" });
            }
        });
    }
    eventos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let listaEventos = [];
            let nombre;
            let id;
            const datos = yield database_1.default.query("SELECT * FROM evento");
            if (datos.length >= 1) {
                let aux = 0;
                for (let evento of datos) {
                    nombre = yield database_1.default.query("SELECT nombre FROM evento WHERE idEvento=?", [evento.idEvento]);
                    id = yield database_1.default.query("SELECT idEvento FROM evento WHERE idEvento=?", [evento.idEvento]);
                    listaEventos[aux] = { nombre, id };
                    aux = aux + 1;
                }
                res.status(200).json(listaEventos);
            }
            else {
                res.status(204).send({ message: "No se adquirieron eventos" });
            }
        });
    }
}
//Instanciamos y exportamos toda la clase
exports.indexController = new IndexController();
