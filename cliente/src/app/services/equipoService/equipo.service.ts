import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Equipo } from 'src/app/models/Equipo';
import { listaEquipo } from 'src/app/models/listaEquipo';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  url = 'http://localhost:3000/crearEquipo';
  url2 ='http://localhost:3000/anadirIntegrante';
  url3 ='http://localhost:3000/allTeams'

  constructor(private _http: HttpClient) { }

  ingresar(equipo:Equipo){

    //Post cambiar si es get
   return this._http.post<any>(this.url,equipo,{withCredentials:true})
    .pipe(catchError(this.errorHandler))
  
  }

  agregarIntegrante(relacion:listaEquipo){
    return this._http.post<any>(this.url2,relacion,{withCredentials:true})
    .pipe(catchError(this.errorHandler))
  }

  buscarUltimoEquipo(){
    return this._http.get<any>(this.url3,{withCredentials:true}).pipe(catchError(this.errorHandler))
  }
  
  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }
}
