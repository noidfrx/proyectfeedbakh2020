import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

//Modelo importado propio del formulario
import { Login } from '../../models/Login';

//Manejo de errores
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // URL para la petición a servidor
  _url = 'http://localhost:3000/login';
  _urlTutorial = 'http://localhost:3000/tutorial';
  constructor(private _http: HttpClient) { }

  ingresar(login:Login){

    //Post cambiar si es get
    return this._http.post<any>(this._url,login,{withCredentials:true})
    .pipe(catchError(this.errorHandler));
  
  }

  tutorialCompletado(){
    return this._http.get<any>(this._urlTutorial,{withCredentials:true})
    .pipe(catchError(this.errorHandler));
  }

  //Manejo de errores
  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }

}
