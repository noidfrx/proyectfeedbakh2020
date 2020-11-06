import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Task } from '../../models/Task';

//Manejo de errores
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskMakerService {

  _url='http://localhost/taskmaker'

  constructor(private _http:HttpClient) { }

  addTask(task:Task){
    return this._http.post<any>(this._url,task)
    .pipe(catchError(this.errorHandler))
  }

  //Manejo de errores
  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }
}
