import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../services/profileService/profile.service';
import {ActivatedRoute} from '@angular/router';
import {Amistad} from 'src/app/models/Amistad';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  datos: any = [];
  errorMsg='';
  amigoId;
  amigos;
  boton: number;
  amistad:Amistad = {
    idColaborador1: null,
    idColaborador2: null,
    aceptado: 0,
  };

  anadirAmigo:Amistad;


  constructor( private route:ActivatedRoute, private ProfileService: ProfileService) { }
 
  verSiAmigo(){
    // ve el tipo de relación que se tiene, 0=rechazado, 1= aceptado,  2=rechazado, false es que no existe
    this.ProfileService.comprobaramistad(this.amistad).subscribe(
      data=>{
        this.amigos=data;
          
          if(this.amigos==1){
            this.boton=1;

          }
          if(this.amigos==0){
            this.boton=3;
          }else{
            this.boton=0;
            /*if(this.amigos==2){  // creo que este caso de prueba nuna se cumple, al rechazar una amistad, me deberpian poder volver a haver ña solicitud????
              //No olvidar darle un par de vueltas a esto a la hora de refinar
                this.boton=2;
                console.log('la amistad ha sido rechazada', this.boton);
            }*/
          }
      },
      error =>{
        this.errorMsg=error.statusText;
        console.log("no se pueden obtener los datos", this.errorMsg);
      }
    )
  }

  agregarAmigo() {
    
    this.ProfileService.anadirAmigo(this.amistad).subscribe(
      data => { 
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )

    this.boton=3;
  }
  eliminarAmigo(){
    this.ProfileService.eliminarAmigo(this.amigoId).subscribe(
      data => { 
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
    this.boton=0;
  }

  eliminarSolicitud(){
    this.boton=0;


  }
  
  ngOnInit() {

    //id del amigo, que es pasada por la url
    this.route.paramMap.subscribe(params => {
      this.amistad.idColaborador2 = params.get('id') as unknown as number;
      this.amigoId = params.get('id');
    })

    //busca los datos del usuario, con el id pasado por la url
    this.ProfileService.datosAmigo(this.amigoId).subscribe(
      data => { 
        this.datos = data;
        this.verSiAmigo();
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("no se pueden obtener los datos")
      }
    )

    
  }

}
