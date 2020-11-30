import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Login } from '../../models/Login';

import { Task } from '../../models/Task';
import { Event } from '../../models/Event';
import { IdBringer } from 'src/app/models/IdBringer';

//Manejo de errores
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class HomeServiceService {
   mostrarEquipo;

  // URL para la petición a servidor
  _url                  = 'http://localhost:3000/login';
  _urlLogout            = 'http://localhost:3000/logout';
  _urlObtenerData       = 'http://localhost:3000/dataUser';
  _urlObtenerEquipos    = 'http://localhost:3000/equiposUsuario';

  _urlObtenerId         = 'http://localhost:3000/idUser';

  _urlCategorias        = 'http://localhost:3000/categorias'
  _urlColaboradores     = 'http://localhost:3000/colaboradores'
  _urlColaboradoresUser = 'http://localhost:3000/colaboradoresusuario'
  _urlTareas            = 'http://localhost:3000/tasks'
  _urlTareasUser        = 'http://localhost:3000/tasksusuario'
  _urlTareasTeam        = 'http://localhost:3000/tasksequipo'
  _urlAgregarTarea      = 'http://localhost:3000/insertTask'
  _urlModificarTarea    = 'http://localhost:3000/modifyTask'
  _urlEventos           = 'http://localhost:3000/events'
  _urlEventosUser       = 'http://localhost:3000/eventsusuario'
  _urlEventosTeam       = 'http://localhost:3000/eventsequipo'
  _urlAgregarEvento     = 'http://localhost:3000/insertEvent'
  _urlModificarEvento   = 'http://localhost:3000/modifyEvent'
  _urlLastTeam          = 'http://localhost:3000/ultimoequipo'
  _urlTarea             = 'http://localhost:3000/liltask'
  _urlEvento            = 'http://localhost:3000/lilevent'
  _urlBanTarea          = 'http://localhost:3000/bantask'
  _urlBanEvento         = 'http://localhost:3000/banevent'

  constructor(private _http: HttpClient) {}

  /*///////
  // GET //
  ///////*/

  logout(){
    return this._http.get<any>(this._urlLogout,{withCredentials:true})
    .pipe(catchError(this.errorHandler));
  }

  obtenerNombreUsuario() {
    return this._http
      .get<any>(this._urlObtenerData, { withCredentials: true })
      .pipe(catchError(this.errorHandler));
  }

  obtenerEquiposUsuario(){
    return this._http
      .get<any>(this._urlObtenerEquipos, {withCredentials: true})
      .pipe(catchError(this.errorHandler));
  }

  getCategorias(){
    return this._http.get<any>(this._urlCategorias, {withCredentials:true})
      .pipe(catchError(this.errorHandler));
  }

  getColaboradores(){
    return this._http.get<any>(this._urlColaboradores, {withCredentials:true})
      .pipe(catchError(this.errorHandler));
  }

  getColaboradoresUser(){
    return this._http.get<any>(this._urlColaboradoresUser, {withCredentials:true})
      .pipe(catchError(this.errorHandler));
  }

  getTareas(){
    return this._http.get<any>(this._urlTareas, {withCredentials:true})
      .pipe(catchError(this.errorHandler));
  }

  getTareasUser(){
    return this._http.get<any>(this._urlTareasUser, {withCredentials:true})
      .pipe(catchError(this.errorHandler));
  }

  getEventos(){
    return this._http.get<any>(this._urlEventos, {withCredentials:true})
      .pipe(catchError(this.errorHandler));
  }

  getEventosUser(){
    return this._http.get<any>(this._urlEventosUser, {withCredentials:true})
      .pipe(catchError(this.errorHandler));
  }

  obtenerIdUsuario() {
    return this._http.get<any>(this._urlObtenerId, { withCredentials: true })
      .pipe(catchError(this.errorHandler));
  }

  getLastTeam(){
    return this._http.get<any>(this._urlLastTeam, { withCredentials: true })
      .pipe(catchError(this.errorHandler));
  }

  getMostrarEquipo(){
    return this.mostrarEquipo;
  }

  

  


  /*////////
  // POST //
  ////////*/

  ingresar(login: Login) {
    return this._http
      .post<any>(this._url, login, { withCredentials: true })
      .pipe(catchError(this.errorHandler));
  }

  addTask(task:Task){
    return this._http.post<any>(this._urlAgregarTarea,task)
    .pipe(catchError(this.errorHandler))
  }

  modTask(task:Task){
    return this._http.post<any>(this._urlModificarTarea,task)
    .pipe(catchError(this.errorHandler))
  }

  addEvent(event:Event){
    return this._http.post<any>(this._urlAgregarEvento,event)
    .pipe(catchError(this.errorHandler))
  }

  modEvent(event:Event){
    return this._http.post<any>(this._urlModificarEvento,event)
    .pipe(catchError(this.errorHandler))
  }

  getTareasTeam(teamId:IdBringer){
    return this._http.post<any>(this._urlTareasTeam, teamId, {withCredentials:true})
      .pipe(catchError(this.errorHandler));
  }

  getEventosTeam(teamId:IdBringer){
    return this._http.post<any>(this._urlEventosTeam, teamId, {withCredentials:true})
      .pipe(catchError(this.errorHandler));
  }

  getTarea(id:IdBringer){
    return this._http.post<any>(this._urlTarea, id)
      .pipe(catchError(this.errorHandler));
  }

  getEvento(id:IdBringer){
    return this._http.post<any>(this._urlEvento, id)
      .pipe(catchError(this.errorHandler));
  }

  banTask(id:IdBringer){
    return this._http.post<any>(this._urlBanTarea, id)
      .pipe(catchError(this.errorHandler));
  }

  banEvent(id:IdBringer){
    return this._http.post<any>(this._urlBanEvento, id)
      .pipe(catchError(this.errorHandler));
  }

  setMostrarEquipo(id:number){
    this.mostrarEquipo = id;
  }

  

  /*/////////////////////
  // MANEJO DE ERRORES //
  /////////////////////*/

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
