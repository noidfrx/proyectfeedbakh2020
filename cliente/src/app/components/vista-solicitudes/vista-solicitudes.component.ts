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
  notifiacion: any[];
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
    // revisa que hayan solicitudes
    this.consulta.obtenerSolicitudes().subscribe(
      res => {
        console.log('datos que recibo',res);
        this.notifiacion=res;
        // llama a la función que mostrar, que como indica, decide qué opciones mostrará
        this.queMostrar();
      },
      err => {
        this.errorMsg=err.statusText;
        console.log("no se pueden obtener los datos");
      });
  
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
    // pasa la ide del otro colaborador a un objeti tipo amistad
    this.amistad.idColaborador2=id as number;
    this.consulta.aceptarAmistad(this.amistad).subscribe(
      data => { 
        console.log(data);
        // una vez que añade a los amigos, cambia los botones
        this.botones=1
      },
      error => {
        console.log(error);
      }
    )
    this.notifiacion.forEach(element=> {
        if(element.idColaborador===id){
          element.idColaborador1=true;
        }

    })
  }
  rechazar(id:number){
    // lo mismo que arriba, pero aquí funciona solo con la id 
    this.consulta.eliminarAmigo(id).subscribe(
      data => { 
        console.log(data);
        this.botones=2
      },
      error => {
        console.log(error);
      }
    )
    this.notifiacion.forEach(element=> {
      if(element.idColaborador===id){
        element.idColaborador1=false;
      }

    })
  }

}
