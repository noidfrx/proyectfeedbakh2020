import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Event } from '../../models/Event';

//Manejo de errores
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventMakerService {

  _url='http://localhost/eventmaker'

  constructor(private _http:HttpClient) { }

  addTask(event:Event){
    return this._http.post<any>(this._url,event)
    .pipe(catchError(this.errorHandler))
  }

  //Manejo de errores
  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }
}
