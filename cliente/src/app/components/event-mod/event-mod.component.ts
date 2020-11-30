import { Component, OnInit } from '@angular/core';
import {Event} from '../../models/Event';
import {HomeServiceService} from '../../services/homeService/home-service.service'
import { IdBringer } from 'src/app/models/IdBringer';
import { Router } from '@angular/router';

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
  
  _evento = new Event('',0,0,0,0,0,0,0,0,0,'','',0);
  eventModel = new Event('',null,null,0,null,null,null,0,0,0,'','',null);
  eventId = new IdBringer(null);
  teamId = new IdBringer(null);
  nombreteam='';

  constructor(private _homeService:HomeServiceService, private router:Router) {
    this.getCategorias();
    this.obtenerEquipoUsuario();
   }

  ngOnInit(): void {
    this.eventId.id=history.state.idevent;
    this.teamId.id=history.state.idteam;
    this.nombreteam=history.state.nombreteam;

    if(this.teamId.id == null){
      this.router.navigate(['/teamview']);
    }

    if(this.eventId.id){
      this.getEvento();
    }else{
      console.log("_evento es null");
    }
  }

  setSuciusFormularius(){
    console.log("tarea usada para form: ", this._evento);
    this.eventModel.evento = this.eventId.id;
    this.eventModel.nombre = this._evento[0].nombre;
    this.eventModel.encargado = this._evento[0].idEncargado;
    this.eventModel.equipo = this._evento[0].idEquipo;
    this.eventModel.dia = this.getDia(this._evento[0].fecha);
    this.eventModel.mes = this.getMes(this._evento[0].fecha);
    this.eventModel.anio =this.getAnio(this._evento[0].fecha);
    this.eventModel.hora = this.getHora(this._evento[0].fecha);
    this.eventModel.minuto = this.getMinuto(this._evento[0].fecha);
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

  getEvento(){
    this._homeService.getEvento(this.eventId).subscribe(
      data => {
        (this._evento = data)
        console.log("Evento con id ", this.eventId.id, " recibido");
        console.log(data);
        this.setSuciusFormularius();
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir el evento de id ", this.eventId);
      }
    )
  }

  // POST
  
  onSubmit(){
    console.log(this.teamId.id);
    console.log(this.eventModel.equipo);
    this.eventModel.equipo = this.teamId.id;
    this._homeService.modEvent(this.eventModel)
    .subscribe(
      data => {
        console.log("Evento modificado!", data);
        alert("Evento modificado con éxito");
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


  /////////////////////////////////
  // Funciones aux para la fecha //
  /////////////////////////////////

  getDia(dat) : number{
    var date = String(dat);
    var fecha = date.split('T',2);
    var fecha2 = fecha[0].split('-',3);
    var dia = fecha2[2];

    return Number(dia);
  }

  getMes(dat) : number{
    var date = String(dat);
    var fecha = date.split('T',2);
    var fecha2 = fecha[0].split('-',3);
    var dia = fecha2[1];

    return Number(dia);
  }

  getAnio(dat) : number{
    var date = String(dat);
    var fecha = date.split('T',2);
    var fecha2 = fecha[0].split('-',3);
    var dia = fecha2[0];

    return Number(dia);
  }


  // 2001-01-01T03:00:00.000Z 
  getHora(dat) : number{
    var date = String(dat);
    var fecha = date.split('T',2);
    var fechus = fecha[1].split('.',2);
    var fecha2 = fechus[0].split(':',3);
    var dia = fecha2[0];

    return Number(dia);
  }

  getMinuto(dat) : number{
    var date = String(dat);
    var fecha = date.split('T',2);
    var fechus = fecha[1].split('.',2);
    var fecha2 = fechus[0].split(':',3);
    var dia = fecha2[1];

    return Number(dia);
  }
  

}
