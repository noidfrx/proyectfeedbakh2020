import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Task } from '../../models/Task';

//Manejo de errores
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskMakerService {

  _url='http://localhost:3000/taskmaker';
  _urlCategorias='http://localhost:3000/taskmaker/categorias'
  _urlColaboradores='http://localhost:3000/taskmaker/colaboradores'
  _urlObtenerEquipos = 'http://localhost:3000/equiposUsuario';

  constructor(private _http:HttpClient) { }

  // GET
  /*getLogin(){
    return this._http.get<any>(this._urlCategorias)
      .pipe(catchError(this.errorHandler));
  }*/

  getCategorias(){
    return this._http.get<any>(this._urlCategorias)
      .pipe(catchError(this.errorHandler));
  }

  getColaboradores(){
    return this._http.get<any>(this._urlColaboradores)
      .pipe(catchError(this.errorHandler));
  }

  /*getEquipos(){
    return this._http.get<any>(this._urlObtenerEquipos)
      .pipe(catchError(this.errorHandler));
  }*/

  //POST

  addTask(task:Task){
    return this._http.post<any>(this._url,task)
    .pipe(catchError(this.errorHandler))
  }

  // home-service.service.ts
  // llamar datos de equipos
  obtenerEquiposUsuario(){
    return this._http
      .get<any>(this._urlObtenerEquipos, {withCredentials: true})
      .pipe(catchError(this.errorHandler));
  }

  //Manejo de errores
  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }
}
