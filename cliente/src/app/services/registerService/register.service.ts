import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Register} from '../../models/Register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

    // URL para la petición a servidor
    _url = 'http://localhost:3000/register';

  constructor(private _http:HttpClient) { }

  registrar(register:Register){
    return this._http.post<any>(this._url,register);
  }
}
