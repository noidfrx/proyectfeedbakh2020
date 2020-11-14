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
export class ComprobarIngresoService {

  // URL para la petición a servidor
  _urlComprobarIngreso = 'http://localhost:3000/idUser';
  constructor(private _http: HttpClient) { }

  comprobarIngreso(){
    return this._http.get<any>(this._urlComprobarIngreso,{withCredentials:true})
    .pipe(catchError(this.errorHandler));
  }

  //Manejo de errores
  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }


}
