import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Equipo } from 'src/app/models/Equipo';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  url = 'http://localhost:3000/crearEquipo';

  constructor(private _http: HttpClient) { }

  ingresar(equipo:Equipo){

    //Post cambiar si es get
   return this._http.post<any>(this.url,equipo,{withCredentials:true})
    .pipe(catchError(this.errorHandler))
  
  }

  /*agregarIntegrante(){
    return this._http.post<any>(this.url,)
  }*/
  
  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }
}
