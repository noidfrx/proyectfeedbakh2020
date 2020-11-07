import { Component, OnInit } from '@angular/core';
import {Event} from '../../models/Event';
import {EventMakerService} from '../../services/eventmakerService/eventmaker.service';

//Para validación de formulario
import {FormControl,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-event-maker',
  templateUrl: './event-maker.component.html',
  styleUrls: ['./event-maker.component.css']
})
export class EventMakerComponent implements OnInit {
  errorMsg='';
  categorias = null;
  colaboradores = null;

  equipos=null;

  constructor(private _eventmakerService:EventMakerService) {
    this.getColaboradores();
    this.getCategorias();
    this.obtenerEquipoUsuario();
   }

  ngOnInit(): void {
  }

  eventModel = new Event('',0,null,0,null,null,null,0,0,0,'','');

  // GET

  getCategorias(){
    this._eventmakerService.getCategorias().subscribe(
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
    this._eventmakerService.getColaboradores().subscribe(
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
    this._eventmakerService.addEvent(this.eventModel)
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
    this._eventmakerService.obtenerEquiposUsuario()
    .subscribe(
      data => {(this.equipos = data)},
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir los equipos");
      }
    )
  }
  

}
