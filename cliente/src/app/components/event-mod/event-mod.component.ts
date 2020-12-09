import { Component, OnInit } from '@angular/core';
import {Event} from '../../models/Event';
import {HomeServiceService} from '../../services/homeService/home-service.service'
import { IdBringer } from 'src/app/models/IdBringer';
import { Router } from '@angular/router';

//Para validación de formulario
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { AlertModEventComponent } from '../box/alert-mod-event/alert-mod-event.component';
import { MatDialog } from '@angular/material/dialog';



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
  
  _evento = new Event('',null,0,0,0,0,0,0,0,0,'','',0);
  eventModel = new Event('',null,null,0,null,null,null,0,0,0,'','',null);
  eventId = new IdBringer(null,null);
  teamId = new IdBringer(null,null);
  nombreteam='';

  integrantes_seleccionados: number[];

  constructor(private _homeService:HomeServiceService, private router:Router, public alertModEvent:MatDialog) {
    this.eventId.id=history.state.idevent;
    this.teamId.id=history.state.idteam;
    this.nombreteam=history.state.nombreteam;
    this.getColaboradoresTeam();
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

    this.integrantes_seleccionados = new Array<number>();
  }

  setSuciusFormularius(){
    console.log("evento usado para form: ", this._evento);
    this.eventModel.evento = this.eventId.id;
    this.eventModel.nombre = this._evento[0].nombre;
    //this.setEncargados();
    this.eventModel.equipo = this._evento[0].idEquipo;
    this.eventModel.dia = this.getDia(this._evento[0].fecha);
    this.eventModel.mes = this.getMes(this._evento[0].fecha);
    this.eventModel.anio =this.getAnio(this._evento[0].fecha);
    this.eventModel.hora = this.getHora(this._evento[0].hora);
    this.eventModel.minuto = this.getMinuto(this._evento[0].hora);
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

  getColaboradoresTeam(){
    this._homeService.getColaboradoresTeam(this.teamId).subscribe(
      data => {
        this.colaboradores = data;
        console.log("Colaboradores recibidos: ", data);
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

  // Función que detecta cambios en la lista de integrantes seleccionados
  checkMiembros(ev:any, id:number){
    if(ev.target.checked){
      console.log("Seleccionado: " + id);
      this.integrantes_seleccionados.push(id);
    }else{
      console.log("DeSeleccionado: " + id);
      this.integrantes_seleccionados = this.integrantes_seleccionados.filter(m=>m!=id);
    }

    console.log("Lista actual: " + this.integrantes_seleccionados + "(cantidad: " + this.integrantes_seleccionados.length + ")");
  }




  // Función que vacia los integrantes de un evento en la base de datos para luego agregar los nuevos seleccionados
  VaciarLuegoAgregarMiembros(){
    this._homeService.vaciarEvento(this.eventId)
    .subscribe(
      data => {
        console.log("Evento vaciado!", data);
        this.agregarMiembrosEvento();
      },
      error => this.errorMsg = error.statusText
      // Manejo de errores ^
    )
  }


  // Función para agregar los nuevos miembros seleccionados
  agregarMiembrosEvento(){
    this._homeService.addEventMiembros(this.eventModel)
      .subscribe(
        data => {
          console.log("Miembros agregados!", data);
          //alert("Evento modificado con éxito");
          this.alertModEvent.open(AlertModEventComponent);
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


  //////////
  // POST //
  //////////

  onSubmit(){
    console.log(this.teamId.id);
    console.log(this.eventModel.equipo);
    this.eventModel.equipo = this.teamId.id;
    this.eventModel.encargados = this.integrantes_seleccionados;
    
    this._homeService.modEvent(this.eventModel)
    .subscribe(
      data => {
        console.log("Evento modificado!", data);
        this.VaciarLuegoAgregarMiembros();
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


  getHora(hora) : number{
    var hora_h = hora.split(':',2);

    return Number(hora_h[0]);
  }

  getMinuto(hora) : number{
    var hora_m = hora.split(':',2);

    return Number(hora_m[1]);
  }

  cancelar(){
    this._homeService.setMostrarEquipo(this.teamId.id);
    this.router.navigate(['/teamview']); 
  }
  

}
