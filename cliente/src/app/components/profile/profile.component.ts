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
  amistades;

  anadirAmigo:Amistad;


  constructor( private route:ActivatedRoute, private ProfileService: ProfileService) { }
 
  verSiAmigo(){
    // ve el tipo de relación que se tiene, 0=rechazado, 1= aceptado,  2=rechazado, false es que no existe
    this.ProfileService.comprobaramistad(this.amistad).subscribe(
      data=>{
        this.amigos=data;
          if(this.amigos==1){
            this.boton=1;
            console.log(" 1 estas personas tienen admistad tipo", this.amigos);

          }
          if(this.amigos==0){
            this.boton=3;
            console.log("2 estas personas tienen admistad tipo",this.amigos);
          }if(this.amigos==2){
            this.boton=0;
            console.log("3 estas personas tienen admistad tipo",this.amigos);
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

  elegirFoto(id:number){
    return this.ProfileService.fotoPerfil(id);
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

    this.ProfileService.amigos2(this.amigoId).subscribe(
      data => { 
        this.amistad = data;
        console.log("los amigos de esta persona son",this.amistad)

      },
      error => {
        this.errorMsg=error.statusText;
        console.log("no se pueden obtener los datos")
      }
    )

    
  }

}
