import { Component, OnInit } from '@angular/core';
import {Event} from '../../models/Event';
import {HomeServiceService} from '../../services/homeService/home-service.service'
import { Router } from '@angular/router';

//Para validación de formulario
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { IdBringer } from 'src/app/models/IdBringer';


@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit {
  errorMsg='';
  categorias = null;
  colaboradores = null;

  equipos=null;

  teamId = new IdBringer(null);
  nombreteam = '';
  eventModel = new Event('',0,null,0,null,null,null,0,0,0,'','',null);

  constructor(private _homeService:HomeServiceService, private router:Router) {
    this.getColaboradoresUser();
    this.getCategorias();
    this.obtenerEquipoUsuario();
   }

  ngOnInit(): void {
    this.teamId.id=history.state.idteam;
    this.nombreteam=history.state.nombreteam;
    if(this.teamId.id == null){
      this.router.navigate(['/teamview']);
    }
  }

  // GET

  getCategorias(){
    this._homeService.getCategorias().subscribe(
      data => {
        (this.categorias = data)
        console.log("Categorias recibidas");
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir las categorias");
      }
    )
  }

  getColaboradoresUser(){
    this._homeService.getColaboradoresUser().subscribe(
      data => {
        (this.colaboradores = data)
        console.log("Colaboradores recibidos");
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir los colaboradores");
      }
    )
  }
  

  // POST
  
  onSubmit(){
    this.eventModel.equipo = this.teamId.id;
    this.eventModel.enlace = '';
    if(this.eventModel.encargado == 0){
      alert("Seleccione un encargado");
    }else{
      this._homeService.addEvent(this.eventModel)
      .subscribe(
        data => {
          console.log("Evento agregado!", data);
          alert("Evento creado con éxito");
          setTimeout(() => 
          {
              this._homeService.setMostrarEquipo(this.teamId.id);
              this.router.navigate(['/teamview']);
          },
          500);
        },
        error => this.errorMsg = error.statusText
        // Manejo de errores ^
      )
    }
  }

  ///////////////////////
  // home.component.ts //
  ///////////////////////

  obtenerEquipoUsuario(){
    this._homeService.obtenerEquiposUsuario()
    .subscribe(
      data => {(this.equipos = data)},
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir los equipos");
      }
    )
  }
  

}
