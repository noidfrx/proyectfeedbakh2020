import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Event } from '../../models/Event';

//Manejo de errores
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventMakerService {

  _url='http://localhost:3000/eventmaker'
  _urlCategorias='http://localhost:3000/eventmaker/categorias'
  _urlColaboradores='http://localhost:3000/eventmaker/colaboradores'
  _urlObtenerEquipos = 'http://localhost:3000/equiposUsuario';

  constructor(private _http:HttpClient) { }
  
  // GET

  getCategorias(){
    return this._http.get<any>(this._urlCategorias)
      .pipe(catchError(this.errorHandler));
  }

  getColaboradores(){
    return this._http.get<any>(this._urlColaboradores)
      .pipe(catchError(this.errorHandler));
  }

  // POST

  addEvent(event:Event){
    return this._http.post<any>(this._url,event)
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
