import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Login } from '../../models/Login';

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

  constructor(private _http: HttpClient) {}

  logout(){
    return this._http.get<any>(this._urlLogout,{withCredentials:true})
    .pipe(catchError(this.errorHandler));
  }
  
  ingresar(login: Login) {
    return this._http
      .post<any>(this._url, login, { withCredentials: true })
      .pipe(catchError(this.errorHandler));
  }

  obtenerNombreUsuario() {
    return this._http
      .get<any>(this._urlObtenerData, { withCredentials: true })
      .pipe(catchError(this.errorHandler));
  }

  //Manejo de errores
  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
