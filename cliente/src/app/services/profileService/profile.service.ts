import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

//Modelo importado propio del formulario
import {Profile} from '../../models/Profile'
//Manejo de errores
import {catchError} from 'rxjs/operators';
import {from, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  // URL para la petición a servidor
  _url = 'http://localhost:3000/perfil/datosIngresado';
  _url2 = 'http://localhost:3000/perfil/amigos';
  constructor(private _http: HttpClient) { }

  datosUsuario(){
    //Post cambiar si es get
    return this._http.get<any>(this._url,{withCredentials:true})
    .pipe(catchError(this.errorHandler));
  
  }

  amigos(){
    //Post cambiar si es get
    return this._http.get<any>(this._url,{withCredentials:true})
    .pipe(catchError(this.errorHandler));
  
  }

  //Manejo de errores
  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }

}
