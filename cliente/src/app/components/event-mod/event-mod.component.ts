import { Component, OnInit } from '@angular/core';
import {Event} from '../../models/Event';
import {HomeServiceService} from '../../services/homeService/home-service.service'

//Para validación de formulario
import {FormControl,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-event-mod',
  templateUrl: './event-mod.component.html',
  styleUrls: ['./event-mod.component.css']
})
export class EventModComponent implements OnInit {

  errorMsg='';
  categorias = null;
  colaboradores = null;
  equipos=null;
  eventos=null;
  //idUsuario=null;
  //encargado=null;

  constructor(private _homeService:HomeServiceService) {
    this.getColaboradores();
    this.getCategorias();
    this.obtenerEquipoUsuario();
    this.getEventos();
    //this.obtenerIdUsuario();
    //this.obtenerNombreUsuario();
   }

  ngOnInit(): void {
  }

  eventModel = new Event('',null,null,0,null,null,null,0,0,0,'','',null);

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

  getEventos(){
    this._homeService.getEventos().subscribe(
      data => {
        (this.eventos = data)
        console.log("Eventos recibidos!");
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir los eventos");
      }
    )
  }

  /*obtenerIdUsuario(){
    this._homeService.obtenerIdUsuario().subscribe(
      data => {
        (this.idUsuario = data.message)
        console.log("Id usuario recibido! idUser:", data.message);
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir id usuario");
      }
    )
  }*/

  /*obtenerNombreUsuario(){
    this._homeService.obtenerNombreUsuario()
      .subscribe(

        //Si me devuelve okay
        data => {
          //La sesión ha sido iniciada correctamente
          (this.encargado = data.message)
          console.log("Nombre usuario recibido! nombre:", data.message);
        },
        error => {
          this.errorMsg = error.statusText;
          console.log("Error, no se recibió nombre de usuario")
        }
      );
  }*/

  // POST
  
  onSubmit(){
    this._homeService.modEvent(this.eventModel)
    .subscribe(
      data => console.log("Evento modificado!", data),
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
