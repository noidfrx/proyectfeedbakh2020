import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Login } from '../../models/Login';

import { Task } from '../../models/Task';
import { Event } from '../../models/Event';

//Manejo de errores
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeServiceService {
  // URL para la petición a servidor
  _url = 'http://localhost:3000/login';
  _urlLogout = 'http://localhost:3000/logout';
  _urlObtenerData = 'http://localhost:3000/dataUser';
  _urlObtenerEquipos = 'http://localhost:3000/equiposUsuario';

  _urlCategorias='http://localhost:3000/categorias'
  _urlColaboradores='http://localhost:3000/colaboradores'
  _urlAgregarTarea='http://localhost:3000/insertTask'
  _urlAgregarEvento='http://localhost:3000/insertEvent'

  constructor(private _http: HttpClient) {}

  /* 
   / GET
  */
  logout(){
    return this._http.get<any>(this._urlLogout,{withCredentials:true})
    .pipe(catchError(this.errorHandler));
  }

  obtenerNombreUsuario() {
    return this._http
      .get<any>(this._urlObtenerData, { withCredentials: true })
      .pipe(catchError(this.errorHandler));
  }

  getCategorias(){
    return this._http.get<any>(this._urlCategorias)
      .pipe(catchError(this.errorHandler));
  }

  getColaboradores(){
    return this._http.get<any>(this._urlColaboradores)
      .pipe(catchError(this.errorHandler));
  }

  /* 
   / POST
  */

  addTask(task:Task){
    return this._http.post<any>(this._urlAgregarTarea,task)
    .pipe(catchError(this.errorHandler))
  }

  addEvent(event:Event){
    return this._http.post<any>(this._urlAgregarEvento,event)
    .pipe(catchError(this.errorHandler))
  }

  obtenerEquiposUsuario(){
    return this._http
      .get<any>(this._urlObtenerEquipos, {withCredentials: true})
      .pipe(catchError(this.errorHandler));
  }

  ingresar(login: Login) {
    return this._http
      .post<any>(this._url, login, { withCredentials: true })
      .pipe(catchError(this.errorHandler));
  }

  /* 
   / MANEJO DE ERRORES
  */

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
