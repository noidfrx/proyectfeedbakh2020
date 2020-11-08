import { Component, OnInit } from '@angular/core';
import {Event} from '../../models/Event';
import {HomeServiceService} from '../../services/homeService/home-service.service'

//Para validación de formulario
import {FormControl,FormGroup,Validators} from '@angular/forms';

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

  constructor(private _homeService:HomeServiceService) {
    this.getColaboradores();
    this.getCategorias();
    this.obtenerEquipoUsuario();
   }

  ngOnInit(): void {
  }

  eventModel = new Event('',0,null,0,null,null,null,0,0,0,'','');

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

  getColaboradores(){
    this._homeService.getColaboradores().subscribe(
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
    this._homeService.addEvent(this.eventModel)
    .subscribe(
      data => console.log("Tarea agregada!", data),
      error => this.errorMsg = error.statusText
      // Manejo de errores ^
    )
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
