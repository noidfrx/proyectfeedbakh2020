import { Component, OnInit } from '@angular/core';
import { Amistad } from 'src/app/models/Amistad';
import { Profile } from 'src/app/models/Profile';
import { ProfileService } from 'src/app/services/profileService/profile.service';

@Component({
  selector: 'app-vista-solicitudes',
  templateUrl: './vista-solicitudes.component.html',
  styleUrls: ['./vista-solicitudes.component.css']
})
export class VistaSolicitudesComponent implements OnInit {

  // dato del tipo perfil, que nos dará informacion sobre la persona que hizo la solicitud
  notifiacion:Profile = {
    id:null,
    nombre:null,
    apellidos:null,
    email:null,
  };
  amistad:Amistad = {
    idColaborador1: null,
    idColaborador2: null,
    aceptado: 1,
  };
  errorMsg: any;
  mostrarNot: boolean;// dice si se debe o no mostrar las notificaciones
  botones:number = 0; //qué botón muestro?

  constructor(private consulta:ProfileService) { }

  ngOnInit(): void {
    console.log("estoy en solicitudes de pana");
    this.consulta.obtenerSolicitudes().subscribe(
      data=>{
        this.notifiacion=data;
        this.queMostrar();

      }, err=>{
        this.errorMsg = err.statusText;
        console.log(this.errorMsg)
      }
    )

  
  }

  // funcion que dicierne sobre qué mensaje mostrar por defecto dentro de la página, dependiendo
  // de si hay notificaciones o no
  queMostrar(){
    if(!this.notifiacion){
      this.mostrarNot=false;
    }else{
      this.mostrarNot=true;
    }
  }
  aceptar(id:number){
    this.amistad.idColaborador2=id;
    this.consulta.aceptarAmistad(id).subscribe(
      data => { 
        console.log(data);
        this.botones=1
      },
      error => {
        console.log(error);
      }
    )
  }
  rechazar(id:number){
    this.consulta.eliminarAmigo(id).subscribe(
      data => { 
        console.log(data);
        this.botones=1
      },
      error => {
        console.log(error);
      }
    )
  }

}
