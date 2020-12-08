import { Component, OnInit } from '@angular/core';
import {Event} from '../../models/Event';
import {HomeServiceService} from '../../services/homeService/home-service.service'
import { Router } from '@angular/router';

//Para validación de formulario
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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

  teamId = new IdBringer(null,null);
  nombreteam = '';
  eventModel = new Event('',null,0,0,null,null,null,0,0,0,'','',null);

  integrantes_seleccionados: number[];

  constructor(private _homeService:HomeServiceService, private router:Router, private fb:FormBuilder) {
    this.teamId.id=history.state.idteam;
    this.nombreteam=history.state.nombreteam;
    this.getColaboradoresTeam();
    this.getCategorias();
    this.obtenerEquipoUsuario();
   }

  ngOnInit(): void {
    this.teamId.id=history.state.idteam;
    this.nombreteam=history.state.nombreteam;
    if(this.teamId.id == null){
      this.router.navigate(['/teamview']);
    }
    console.log("idteam: ", this.teamId.id);
    console.log("nombreteam: ", this.nombreteam);

    this.integrantes_seleccionados = new Array<number>();
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

  /*getColaboradoresUser(){
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
  }*/

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
  

  // POST
  
  onSubmit(){
    this.eventModel.equipo = this.teamId.id;
    this.eventModel.encargados = this.integrantes_seleccionados;
    if(this.eventModel.encargados.length == 0){
      alert("Seleccione integrantes que participaran");
    }else{
      this.addEvento();
      console.log("this.addEvento");
      /*this.buscarEvento();
      console.log("this.buscarEvento");
      this.completarAddEvent();
      console.log("this.completarAddEvent");*/
    }
  }

  addEvento(){
    this._homeService.addEvent(this.eventModel)
      .subscribe(
        data => {
          console.log("Evento agregado!", data);
          this.buscarEvento();
          console.log("this.buscarEvento");
        },
        error => {
          this.errorMsg = error.statusText;
          alert("No se pudo agregar el evento");
        }
        
        // Manejo de errores ^
      );
  }


  // Funcion que asocia a los miembros seleccionados al evento
  // (y asi terminar la creacion de forma completa)
  completarAddEvent(){
    this._homeService.addEventMiembros(this.eventModel)
      .subscribe(
        data => {
          console.log("Miembros agregados!", data);
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


  // Función auxiliar para adquirir el ID del evento segun los datos del evento
  async buscarEvento(){
    console.log("Buscar evento...");
    this._homeService.buscarEvento(this.eventModel)
      .subscribe(
        data => {
          console.log("Evento encontrado!", data);
          this.eventModel.evento = data[0].idEvento;
          this.completarAddEvent();
          console.log("this.completarAddEvent");
        },
        error => {
          this.errorMsg = error.statusText;
          console.log(this.errorMsg);
          alert("Error al buscar el evento");
        }
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

  cancelar(){
    this._homeService.setMostrarEquipo(this.teamId.id);
    this.router.navigate(['/teamview']); 
  }
  

}
