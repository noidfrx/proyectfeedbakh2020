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
const bcrypt = require("bcrypt");
class IndexController {
    index(req, res) {
        res.send("Hello from indexController");
    }
    //Se registra nuevo usuario
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const password = req.body.password;
            bcrypt.hash(password, 10, function (err, hash) {
                return __awaiter(this, void 0, void 0, function* () {
                    //Se crea objeto en COLABORADOR
                    yield database_1.default.query("INSERT INTO colaborador (nombre, apellidos, email, password) VALUES (?,?,?,?)", [
                        req.body.nombre,
                        req.body.apellidoPaterno + " " + req.body.apellidoMaterno,
                        req.body.email,
                        hash,
                    ]);
                });
            });
            res.json({ message: "Colaborador guardado" });
        });
    }
    //Se comprueba que exista el usuario
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Hacer validaciones con req.body.email req.body.password
            const email = req.body.email;
            const password = req.body.password;
            //Obtenemos objetos con valor email
            const datoComprobacion = yield database_1.default.query("SELECT * FROM colaborador WHERE email=?", [email]);
            //Cuando hay un dato que coincide con el email y la contraseña
            if (datoComprobacion.length == 1) {
                //Comparar contraseñas y desencriptar
                yield bcrypt.compare(password, datoComprobacion[0].password, function (err, result) {
                    return __awaiter(this, void 0, void 0, function* () {
                        //Si las contraseñas están bien
                        if (result) {
                            //Cuando todo sale bien se manda código de OK
                            const idDatoComprobacion = yield database_1.default.query("SELECT idColaborador FROM colaborador WHERE email=?", [email]);
                            //Se guarda nombre e id de colaborador en sesión
                            req.session.idUserIniciado = idDatoComprobacion[0].idColaborador;
                            req.session.nombreUserIniciado = datoComprobacion[0].nombre;
                            console.log("Sesión iniciada como: " +
                                req.session.idUserIniciado +
                                " " +
                                req.session.nombreUserIniciado);
                            //Envia dato de colaborador a angular
                            res.status(200).send({
                                id: idDatoComprobacion[0].idColaborador,
                                nombre: datoComprobacion[0].nombre,
                                apellidoPaterno: datoComprobacion[0].apellidoPaterno,
                                message: datoComprobacion[0],
                                tutorial: datoComprobacion[0].tutorial,
                            });
                        }
                        else {
                            res.status(401).send({ message: "Credenciales no coinciden" });
                        }
                    });
                });
            }
            else {
                res.status(401).send({ message: "No existe ese usuario" });
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
                    const nombreEquipo = yield database_1.default.query("SELECT nombre,idEquipo,objetivo FROM equipo WHERE idEquipo = ?", [equipo.idEquipo]);
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
                res
                    .status(204)
                    .send({ message: "No hay equipos para el Usuario Ingresado" });
            }
        });
    }
    //  Query para agregar una nueva tarea
    addTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.default.query("INSERT INTO tarea (nombre, fecha, descripcion, idCategoria, idEquipo) VALUES (?,?,?,?,?)", [
                req.body.nombre,
                req.body.anio + "-" + req.body.mes + "-" + req.body.dia,
                req.body.descripcion,
                req.body.categoria,
                req.body.equipo,
            ]);
            let idTareaQuery = yield database_1.default.query("SELECT idTarea FROM tarea WHERE nombre=? AND idCategoria=? AND descripcion=? AND idEquipo=?", [
                req.body.nombre,
                req.body.categoria,
                req.body.descripcion,
                req.body.equipo,
            ]);
            if (idTareaQuery.length >= 1) {
                if (req.body.encargado == 0) {
                    yield database_1.default.query("INSERT INTO listatareas (idTarea, idColaborador) VALUES (?,?)", [
                        idTareaQuery[0].idTarea,
                        req.session.idUserIniciado
                    ]);
                }
                else {
                    yield database_1.default.query("INSERT INTO listatareas (idTarea, idColaborador) VALUES (?,?)", [
                        idTareaQuery[0].idTarea,
                        req.body.encargado
                    ]);
                }
            }
            else {
                console.log("idTareaQuery esta vacio");
            }
            res.status(200).json({ message: "Tarea guardada" });
        });
    }
    //  Query para modificar una tarea
    modTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.default.query("UPDATE tarea SET nombre=?, fecha=?, descripcion=?, idCategoria=?, idEquipo=? WHERE idTarea=?", [
                req.body.nombre,
                req.body.anio + "-" + req.body.mes + "-" + req.body.dia,
                req.body.descripcion,
                req.body.categoria,
                req.body.equipo,
                req.body.tarea,
            ]);
            res.status(200).json({ message: "Tarea modificada" });
        });
    }
    // Query para agregar una nuevo evento
    addEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.default.query("INSERT INTO evento (nombre, fecha, hora, descripcion, idEquipo, enlaceVideoconferencia, privacidad) VALUES (?,?,?,?,?,?,?)", [
                req.body.nombre,
                req.body.anio + "-" + req.body.mes + "-" + req.body.dia,
                req.body.hora + ":" + req.body.minuto,
                req.body.descripcion,
                req.body.equipo,
                req.body.enlace,
                req.body.privacidad,
            ]);
            /*let idEventoQuery = await pool.query("SELECT idEvento FROM evento WHERE nombre=? AND idCategoria=? AND descripcion=? AND idEquipo=? AND enlaceVideoconferencia=?",
              [
                req.body.nombre,
                req.body.categoria,
                req.body.descripcion,
                req.body.equipo,
                req.body.enlace
              ]
            );
            
            if(idEventoQuery.length >= 1){
              await pool.query(
                "INSERT INTO listaeventos (idEvento, idColaborador) VALUES (?,?)",
                [
                  idEventoQuery[0].idEvento,
                  req.body.encargado
                ]
              );
            }else{
              console.log("idEventoQuery esta vacio");
            }*/
            res.status(200).json({ message: "Evento guardado" });
        });
    }
    //  Query para modificar un evento
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
                req.body.evento,
            ]);
            res.status(200).json({ message: "Evento modificado" });
        });
    }
    //  Query para obtener todas las categorias
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
    //  Query para obtener todos los colaboradores 
    colaboradores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let listaColaboradores = [];
            let nombreColaborador;
            let apellidosColaborador;
            let idColaborador;
            const datos = yield database_1.default.query("SELECT * FROM amigo WHERE (idColaborador1=? OR idColaborador2=?) AND aceptado=1", [req.session.idUserIniciado, req.session.idUserIniciado]);
            if (datos.length >= 1) {
                let aux = 0;
                for (let colaborador of datos) {
                    nombreColaborador = yield database_1.default.query("SELECT nombre FROM colaborador WHERE idColaborador=?", [colaborador.idColaborador]);
                    apellidosColaborador = yield database_1.default.query("SELECT apellidos FROM colaborador WHERE idColaborador=?", [colaborador.idColaborador]);
                    idColaborador = yield database_1.default.query("SELECT idColaborador FROM colaborador WHERE idColaborador=?", [colaborador.idColaborador]);
                    listaColaboradores[aux] = {
                        nombreColaborador,
                        apellidosColaborador,
                        idColaborador,
                    };
                    aux = aux + 1;
                }
                res.status(200).json(listaColaboradores);
            }
            else {
                res.status(204).send({ message: "No se adquirieron colaboradores" });
            }
        });
    }
    // Query para obtener una lista de colaboradores (solo los que posea el usuario actual)
    colaboradores_usuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let listaColaboradores = [];
            let nombreColaborador;
            let apellidosColaborador;
            let idColaborador;
            //let id;
            // Verificar si tiene algun colaborador agregado
            const datos = yield database_1.default.query("SELECT DISTINCT colaborador.idColaborador, colaborador.nombre, colaborador.apellidos FROM `colaborador` INNER JOIN amigo ON (amigo.idColaborador1=colaborador.idColaborador OR amigo.idColaborador2=colaborador.idColaborador) AND colaborador.idColaborador!=? AND amigo.aceptado=1 AND (amigo.idColaborador1 = ? OR amigo.idColaborador2 = ?)", [req.session.idUserIniciado, req.session.idUserIniciado, req.session.idUserIniciado]);
            if (datos.length >= 1) {
                let aux = 0;
                // Obtenemos id de todos los amigos aceptados
                // Columna idColaborador1
                for (let colaborador of datos) {
                    nombreColaborador = yield database_1.default.query("SELECT nombre FROM colaborador WHERE idColaborador=?", [colaborador.idColaborador]);
                    apellidosColaborador = yield database_1.default.query("SELECT apellidos FROM colaborador WHERE idColaborador=?", [colaborador.idColaborador]);
                    idColaborador = yield database_1.default.query("SELECT idColaborador FROM colaborador WHERE idColaborador=?", [colaborador.idColaborador]);
                    listaColaboradores[aux] = {
                        nombreColaborador,
                        apellidosColaborador,
                        idColaborador,
                    };
                    aux = aux + 1;
                }
                res.status(200).json(listaColaboradores);
            }
            else {
                res.status(204).send({ message: "No se adquirieron colaboradores" });
            }
        });
    }
    // Query para retornar todas las tareas
    tareas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let listaTareas = [];
            let nombre;
            let id;
            const datos = yield database_1.default.query("SELECT * FROM tarea");
            if (datos.length >= 1) {
                let aux = 0;
                for (let tarea of datos) {
                    nombre = yield database_1.default.query("SELECT nombre FROM tarea WHERE idTarea=?", [
                        tarea.idTarea,
                    ]);
                    id = yield database_1.default.query("SELECT idTarea FROM tarea WHERE idTarea=?", [
                        tarea.idTarea,
                    ]);
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
    // Query para retornar las tareas asignadas al usuario
    tareas_usuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tareas = yield database_1.default.query('SELECT tarea.* FROM tarea INNER JOIN (SELECT listatareas.idTarea FROM listatareas WHERE listatareas.idColaborador=?) AS taskId ON tarea.idTarea=taskId.idTarea', [req.session.idUserIniciado]);
            console.log(req.session.idUserIniciado);
            console.log(tareas);
            if (tareas.length >= 1) {
                res.status(200).json(tareas);
            }
            res.status(404).send({ message: "No se retornaron tareas asignadas al usuario" });
        });
    }
    // Query para retornar las tareas segun el equipo seleccionado
    tareas_equipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let team = Number(req.body.id);
            if (team == 0) {
                /*const tareas = await pool.query('SELECT tarea.* FROM tarea INNER JOIN (SELECT * FROM listaequipo WHERE listaequipo.idColaborador=?) AS equipos_user ON equipos_user.idEquipo=tarea.idEquipo',
                [req!.session!.idUserIniciado]);*/
                const tareas = yield database_1.default.query('SELECT * FROM tarea');
                console.log(tareas);
                if (tareas.length >= 1) {
                    res.status(200).json(tareas);
                }
                else {
                    res.status(204).send({ message: "No se retornaron tareas asignadas al equipo" });
                }
            }
            else {
                /*const tareas = await pool.query('SELECT tarea.* FROM tarea INNER JOIN (SELECT * FROM listaequipo WHERE listaequipo.idColaborador=?) AS equipos_user ON equipos_user.idEquipo=tarea.idEquipo WHERE tarea.idEquipo=?',
                [req!.session!.idUserIniciado, team]);*/
                const tareas = yield database_1.default.query('SELECT * FROM tarea WHERE idEquipo=?', [team]);
                if (tareas.length >= 1) {
                    res.status(200).json(tareas);
                }
                else {
                    res.status(204).send({ message: "No se retornaron tareas asignadas al equipo" });
                }
            }
        });
    }
    // Query para retornar el id del ultimo equipo creado
    equipo_ultimo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const equipo = yield database_1.default.query('SELECT equipo.* FROM equipo INNER JOIN (SELECT * FROM listaequipo WHERE idColaborador=?) AS listado ON listado.idEquipo=equipo.idEquipo ORDER BY equipo.idEquipo DESC LIMIT 1', [req.session.idUserIniciado]);
            if (equipo.length >= 1) {
                res.status(200).json(equipo[0]);
            }
            else {
                res.status(204).send({ message: "No se retorno el ultimo equipo" });
            }
        });
    }
    // Query para retornar todos los eventos
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
                    id = yield database_1.default.query("SELECT idEvento FROM evento WHERE idEvento=?", [
                        evento.idEvento,
                    ]);
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
    // Query para retornar eventos segun usuario
    eventos_usuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //let listaEventos = [];
            //let nombre;
            //let id;
            const datos = yield database_1.default.query("SELECT evento.* FROM `evento` INNER JOIN listaeventos ON evento.idEvento=listaeventos.idEvento WHERE idColaborador=?", [req.session.idUserIniciado]);
            if (datos.length >= 1) {
                /*let aux = 0;
                for (let evento of datos) {
                  nombre = await pool.query(
                    "SELECT nombre FROM evento WHERE idEvento=?",
                    [evento.idEvento]
                  );
                  id = await pool.query("SELECT idEvento FROM evento WHERE idEvento=?", [
                    evento.idEvento,
                  ]);
          
                  listaEventos[aux] = { nombre, id };
                  aux = aux + 1;
                }*/
                console.log(datos);
                res.status(200).json(datos);
            }
            else {
                res.status(204).send({ message: "No se adquirieron eventos del usuario" });
            }
        });
    }
    // Query para retornar eventos segun equipo
    eventos_equipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let team = Number(req.body.id);
            if (team == 0) {
                /*const eventos = await pool.query('SELECT evento.* FROM evento INNER JOIN (SELECT * FROM listaeventos WHERE listaeventos.idColaborador=?) AS eventos_user ON eventos_user.idEvento=evento.idEvento',
                [req!.session!.idUserIniciado]);*/
                const eventos = yield database_1.default.query('SELECT * FROM evento');
                console.log(eventos);
                if (eventos.length >= 1) {
                    res.status(200).json(eventos);
                }
                else {
                    res.status(204).send({ message: "No se retornaron eventos asignados al equipo" });
                }
            }
            else {
                /*const eventos = await pool.query('SELECT evento.* FROM evento INNER JOIN (SELECT * FROM listaeventos WHERE listaeventos.idColaborador=?) AS eventos_user ON eventos_user.idEvento=evento.idEvento WHERE evento.idEquipo=?',
                [req!.session!.idUserIniciado, team]);*/
                const eventos = yield database_1.default.query('SELECT * FROM evento WHERE idEquipo=?', [team]);
                if (eventos.length >= 1) {
                    res.status(200).json(eventos);
                }
                else {
                    res.status(204).send({ message: "No se retornaron eventos asignados al equipo" });
                }
            }
        });
    }
    // Query para comprobar si el usuario ha visto el tutorial
    tutorial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let tutorialCompletado = yield database_1.default.query("SELECT tutorial FROM colaborador WHERE idColaborador=?", [req.session.idUserIniciado]);
            if (tutorialCompletado.length >= 1) {
                if ((tutorialCompletado[0].tutorial) == 0) {
                    yield database_1.default.query("UPDATE colaborador SET tutorial=? WHERE idColaborador=?", [1, req.session.idUserIniciado]);
                    res.status(200).send({
                        visto: 0,
                        mesage: "Se ha marcado como completado el tutorial"
                    });
                }
                else {
                    res.status(200).send({
                        visto: 1,
                        message: "Ya se ha visto el tutorial"
                    });
                }
            }
            else {
                res.status(400).send({ message: "Error en la query" });
            }
        });
    }
    crearEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("INSERT INTO equipo (nombre, objetivo) VALUES (?,?)", [req.body.nombre, req.body.objetivo]);
            res.status(200).json(true);
        });
    }
    getEquipos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const equipos = yield database_1.default.query("SELECT * FROM equipo ORDER BY idEquipo DESC");
            console.log(equipos[0].idEquipo);
            res.status(200).json(equipos[0].idEquipo);
        });
    }
    agregarIntegranteEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.encargado == 1) {
                yield database_1.default.query("INSERT INTO listaequipo (idEquipo,idColaborador,encargado) VALUES (?,?,?)", [req.body.idEquipo, req.session.idUserIniciado, req.body.encargado]);
                res.status(200).json({ message: "true" });
            }
            else {
                yield database_1.default.query("INSERT INTO listaequipo (idEquipo,idColaborador,encargado) VALUES (?,?,?)", [req.body.idEquipo,
                    req.body.idColaborador, req.body.encargado]);
                res.status(200).json({ message: "true" });
            }
        });
    }
    // Query para retornar una tarea segun su id
    una_tarea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.body.id;
            const datos = yield database_1.default.query("SELECT * FROM tarea WHERE idTarea=?", [id]);
            if (datos.length >= 1) {
                res.status(200).json(datos);
            }
            else {
                res.status(204).send({ message: "No se adquirio la tarea con el id dado" });
            }
        });
    }
    // Query para retornar un evento segun su id
    un_evento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.body.id;
            const datos = yield database_1.default.query("SELECT * FROM evento WHERE idEvento=?", [id]);
            if (datos.length >= 1) {
                res.status(200).json(datos);
            }
            else {
                res.status(204).send({ message: "No se adquirio el evento con el id dado" });
            }
        });
    }
    // Query para eliminar una tarea segun id
    ban_tarea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("DELETE FROM tarea WHERE idTarea=?", [req.body.id]);
            res.json({ message: "Tarea eliminada" });
        });
    }
    // Query para eliminar una tarea segun id
    ban_evento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("DELETE FROM evento WHERE idEvento=?", [req.body.id]);
            res.json({ message: "Evento eliminado" });
        });
    }
    // Query para verificar si el usuario es el encargado de un equipo
    equipo_owner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield database_1.default.query("SELECT encargado FROM listaequipo WHERE idEquipo=? AND idColaborador=? AND encargado=1", [req.body.id, req.session.idUserIniciado]);
            // Si el usuario es el admin, se considera instantaneamente como propietario de todos los equipos
            if (req.session.idUserIniciado == 1) {
                res.status(200).json("1");
            }
            else {
                res.status(200).json(check);
            }
        });
    }
    // Query para verificar si el usuario es el encargado de una tarea
    tarea_owner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield database_1.default.query("SELECT idColaborador FROM listatareas WHERE idTarea=? AND idColaborador=?", [req.body.id, req.session.idUserIniciado]);
            // Si el usuario es el admin, se considera instantaneamente como propietario de todas las tareas
            if (req.session.idUserIniciado == 1) {
                res.status(200).json("1");
            }
            else {
                res.status(200).json(check);
            }
        });
    }
    // Query para marcar una tarea como completada
    set_completado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("UPDATE tarea SET completado = '1' WHERE tarea.idTarea = ?", req.body.id);
            res.status(200).json({ message: "Tarea marcada como completada" });
        });
    }
    // Query para marcar una tarea como NO completada
    set_nocompletado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("UPDATE tarea SET completado = '0' WHERE tarea.idTarea = ?", req.body.id);
            res.status(200).json({ message: "Tarea marcada como NO completada" });
        });
    }
    // Query para obtener una lista de colaboradores del equipo actual
    colaboradores_equipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const datos = yield database_1.default.query("SELECT DISTINCT colaborador.idColaborador, colaborador.nombre, colaborador.apellidos FROM colaborador INNER JOIN listaequipo ON listaequipo.idEquipo=? AND listaequipo.idColaborador=colaborador.idColaborador AND colaborador.idColaborador!=1", [req.body.id]);
            if (datos.length >= 1) {
                res.status(200).json(datos);
            }
            else {
                res.status(204).send({ message: "No se adquirieron colaboradores" });
            }
        });
    }
    // Query para obtener una lista de colaboradores dela lista de amigos que no esten en el equipo
    colaboradores_noequipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const datos = yield database_1.default.query("SELECT DISTINCT colaborador.idColaborador, colaborador.nombre, colaborador.apellidos FROM colaborador INNER JOIN listaequipo ON listaequipo.idEquipo=? AND listaequipo.idColaborador=colaborador.idColaborador AND colaborador.idColaborador!=1", [req.body.id]);
            if (datos.length >= 1) {
                res.status(200).json(datos);
            }
            else {
                res.status(204).send({ message: "No se adquirieron colaboradores" });
            }
        });
    }
}
//Instanciamos y exportamos toda la clase
exports.indexController = new IndexController();
