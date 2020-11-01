import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
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
  constructor(private _http: HttpClient) { }

  ingresar(login:Login){
    return this._http.post<any>(this._url,login)
    .pipe(catchError(this.errorHandler));
  }

  //Manejo de errores
  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }
}
