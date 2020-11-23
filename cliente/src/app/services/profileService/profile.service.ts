import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

//Modelo importado propio del formulario
import {Profile} from '../../models/Profile'
//Manejo de errores
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { Amistad } from 'src/app/models/Amistad';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  // URL para la petición a servidor
  _url = 'http://localhost:3000/perfil';
  url2 = 'http://localhost:3000/perfil/comprobarAmistad';
  
  
  constructor(private _http: HttpClient) { }

  datosUsuario(){
    //Post cambiar si es get

    return this._http.get<any>(`${this._url}/datosIngresado`,{withCredentials:true})
    .pipe(catchError(this.errorHandler));
  
  }

  amigos(){
    //Post cambiar si es get
    return this._http.get<any>(`${this._url}/amigos`,{withCredentials:true})
    .pipe(catchError(this.errorHandler));
  
  }

  datosAmigo(id){
    //Post cambiar si es get
    return this._http.get<any>(`${this._url}/todosLosDatos/${id}`,{withCredentials:true})
    .pipe(catchError(this.errorHandler));
  
  }


  comprobaramistad(amistad:Amistad){
    return this._http.post<any>(this.url2,amistad, {withCredentials:true})
    .pipe(catchError(this.errorHandler));
  }

  buscarUsuario(datos:Profile){
    return this._http.post<any>(`${this._url}/buscarUsuarios`,datos,{withCredentials:true})
    .pipe(catchError(this.errorHandler));
  }

  //Manejo de errores
  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }

}
