import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Login } from '../../models/Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // URL para la petición a servidor
  _url = 'http://localhost:3000/login';
  constructor(private _http: HttpClient) { }

  ingresar(login:Login){
    return this._http.post<any>(this._url,login);
  }
}
