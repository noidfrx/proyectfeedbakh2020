import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeServiceService } from 'src/app/services/homeService/home-service.service';

//Para validación de formulario
import {FormControl,FormGroup,Validators} from '@angular/forms';



@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.css']
})
export class TeamViewComponent implements OnInit {

  errorMsg='';
  categorias = null;
  colaboradores = null;
  equipos=null;
  tareas=null;
  eventos=null;

  constructor(private _homeService:HomeServiceService, private router:Router) {
    this.getColaboradoresUser();
    this.getCategorias();
    this.obtenerEquipoUsuario();
    this.getTareasTeam();
    this.getEventosUser();
   }

  ngOnInit(): void {
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

  getTareasTeam(){
    this._homeService.getTareasTeam().subscribe(
      data => {
        (this.tareas = data)
        console.log("Tareas del usuario recibidas");
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir las tareas del usuario");
      }
    )
  }

  getEventosUser(){
    this._homeService.getEventosUser().subscribe(
      data => {
        (this.eventos = data)
        console.log("Eventos del usuario recibidos");
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir los eventos del usuario");
      }
    )
  }

  // POST

  /*onSubmit(){
    this._taskmakerService.addTask(this.taskModel)
    .subscribe(
      data => console.log("Tarea agregada!", data),
      error => this.errorMsg = error.statusText
      // Manejo de errores ^
    )
  }*/

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
