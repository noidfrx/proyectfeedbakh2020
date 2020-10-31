import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Register} from '../../models/Register';

//Manejo de errores
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

    // URL para la petición a servidor
    _url = 'http://localhost:3000/register';

  constructor(private _http:HttpClient) { }

  registrar(register:Register){
    //Con pipe manejamos el error
    return this._http.post<any>(this._url,register)
    .pipe(catchError(this.errorHandler))
  }

  //Manejo de errores
  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }
}
