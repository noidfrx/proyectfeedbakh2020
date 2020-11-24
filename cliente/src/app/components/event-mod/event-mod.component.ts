import { Component, OnInit } from '@angular/core';
import {Event} from '../../models/Event';
import {HomeServiceService} from '../../services/homeService/home-service.service'
import { IdBringer } from 'src/app/models/IdBringer';

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
  _evento = new Event('',0,0,0,0,0,0,0,0,0,'','',0);
  eventModel = new Event('',null,null,0,null,null,null,0,0,0,'','',null);
  teamId = new IdBringer(null);

  constructor(private _homeService:HomeServiceService) {
    //this.getColaboradores();
    this.getCategorias();
    this.obtenerEquipoUsuario();
    //this.getEventosUser();
    //this.obtenerIdUsuario();
    //this.obtenerNombreUsuario();
   }

  ngOnInit(): void {
    console.log("---TASKMOD---");
    this.teamId.id=history.state.id;
    console.log("idEvento: ",this.teamId.id);
    if(this.teamId.id){
      this.getEvento();
      //this.setSuciusFormularius();
      //console.log(this._tarea);
    }else{
      console.log("_tarea es null");
    }
  }

  setSuciusFormularius(){
    console.log("tarea usada para form: ", this._evento);
    this.eventModel.evento = this.teamId.id;
    this.eventModel.nombre = this._evento[0].nombre;
    this.eventModel.encargado = this._evento[0].idEncargado;
    this.eventModel.equipo = this._evento[0].idEquipo;
    this.eventModel.dia = 1;
    this.eventModel.mes = 1;
    this.eventModel.anio = 1;
    this.eventModel.hora = 1;
    this.eventModel.minuto = 1;
    this.eventModel.categoria = this._evento[0].idCategoria;
    this.eventModel.privacidad = this._evento[0].privacidad;
    this.eventModel.descripcion = this._evento[0].descripcion;
    this.eventModel.enlace = this._evento[0].enlaceVideoconferencia;
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

  getEventosUser(){
    this._homeService.getEventosUser().subscribe(
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

  getEvento(){
    this._homeService.getEvento(this.teamId).subscribe(
      data => {
        (this._evento = data)
        console.log("Evento con id ", this.teamId.id, " recibido");
        console.log(data);
        this.setSuciusFormularius();
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir el evento de id ", this.teamId);
      }
    )
  }

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
