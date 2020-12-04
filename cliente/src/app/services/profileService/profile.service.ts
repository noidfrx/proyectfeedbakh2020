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
    return this._http.get<any>(`${this._url}/datosIngresado`,{withCredentials:true})
    .pipe(catchError(this.errorHandler));
  }

  obtenerSolicitudes(){
    return this._http.get<any>(`${this._url}/obtenerSolicitudes`,{withCredentials:true})
    .pipe(catchError(this.errorHandler));
  }

  amigos(){
    return this._http.get<any>(`${this._url}/amigos`,{withCredentials:true})
    .pipe(catchError(this.errorHandler));
  
  }

  datosAmigo(id){
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

  //envía una solicitud de amistad al amigo seleccionado
  anadirAmigo(datos:Amistad){
    return this._http.post<any>(`${this._url}/anadirAmigo`,datos,{withCredentials:true})
    .pipe(catchError(this.errorHandler));
  }

 // elimina la relacion de amistad en la bd 
  eliminarAmigo(id:number){
    return this._http.delete<any>(`${this._url}/eliminarAmigo/${id}`,{withCredentials:true})
    .pipe(catchError(this.errorHandler));
  }

  //acepta una amistad
  aceptarAmistad(id:number){
    return this._http.put<any>(`${this._url}/aceptarAmistad`,{withCredentials:true})
    .pipe(catchError(this.errorHandler));
  }



  //Manejo de errores
  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }

}
