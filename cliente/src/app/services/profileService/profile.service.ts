import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

//Modelo importado propio del formulario
import {Profile} from '../../models/Profile'
//Manejo de errores
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { Amistad } from 'src/app/models/Amistad';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  // URL para la petición a servidor
  _url = 'http://localhost:3000/perfil';
  url2 = 'http://localhost:3000/perfil/comprobarAmistad';
  
  
  constructor(private _http: HttpClient) { }

  datosUsuario(){
    return this._http.get<any>(`${this._url}/datosIngresado`,{withCredentials:true})
    .pipe(catchError(this.errorHandler));
  }

  obtenerSolicitudes(){
    return this._http.get<any>(`${this._url}/obtenerSolicitudes`,{withCredentials:true})
    .pipe(catchError(this.errorHandler));
  }

  amigos(){
    return this._http.get<any>(`${this._url}/amigos`,{withCredentials:true})
    .pipe(catchError(this.errorHandler));
  
  }
  amigos2(id){
    return this._http.get<any>(`${this._url}/amigos2/${id}`,{withCredentials:true})
    .pipe(catchError(this.errorHandler));
  
  }

  datosAmigo(id){
    return this._http.get<any>(`${this._url}/todosLosDatos/${id}`,{withCredentials:true})
    .pipe(catchError(this.errorHandler));
  
  }


  comprobaramistad(amistad:Amistad){
    return this._http.post<any>(this.url2,amistad, {withCredentials:true})
    .pipe(catchError(this.errorHandler));
  }

  buscarUsuario(datos:Profile){
    return this._http.post<any>(`${this._url}/buscarUsuarios`,datos,{withCredentials:true})
    .pipe(catchError(this.errorHandler));
  }

  //envía una solicitud de amistad al amigo seleccionado
  anadirAmigo(datos:Amistad){
    return this._http.post<any>(`${this._url}/anadirAmigo`,datos,{withCredentials:true})
    .pipe(catchError(this.errorHandler));
  }

 // elimina la relacion de amistad en la bd 
  eliminarAmigo(id:number){
    return this._http.delete<any>(`${this._url}/eliminarAmigo/${id}`,{withCredentials:true})
    .pipe(catchError(this.errorHandler));
  }

  //acepta una amistad
  aceptarAmistad(datos:Amistad){
    return this._http.put<any>(`${this._url}/aceptarAmistad`,datos,{withCredentials:true})
    .pipe(catchError(this.errorHandler));
  }

  actualizarPerfil(datos:Profile){
    return this._http.put<any>(`${this._url}/actualizarPerfil`,datos,{withCredentials:true})
    .pipe(catchError(this.errorHandler));
  }

  fotoPerfil(foto:number){
    
    if(foto==0){
      return "../../../assets/easter-bunny.png";
    }
    if(foto==1){
      return "../../../assets/bicycle-5.svg";
    }
    if(foto==2){
      return "../../../assets/cat-3.svg";
    }
    if(foto==3){
      return "../../../assets/customer-4.svg";
    }
    if(foto==4){
      return "../../../assets/turtle.svg";
    }
    if(foto==5){
      return "../../../assets/horse-24.svg";
    }
    if(foto==6){
      return "../../../assets/iconmonstr-easter-19.svg";
    }
    if(foto==7){
      return "../../../assets/school-26.svg";
    }
    if(foto==8){
      return "../../../assets/school-27.svg";
    }
    if(foto==9){
      return "../../../assets/tree-8.svg";
    }
    if(foto==10){
      return "../../../assets/fish-2.svg";
    }
  }


  //Manejo de errores
  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }

}
