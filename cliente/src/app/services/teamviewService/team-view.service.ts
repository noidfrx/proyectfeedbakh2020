import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Register} from '../../models/Register';

//Manejo de errores
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TeamViewService {

  _url='http://localhost:3000/teamview';

  constructor() { }
}
