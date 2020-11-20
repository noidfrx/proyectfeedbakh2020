import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Task} from '../../models/Task';
import {HomeServiceService} from '../../services/homeService/home-service.service'

//Para validación de formulario
import {FormControl,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-task-mod',
  templateUrl: './task-mod.component.html',
  styleUrls: ['./task-mod.component.css']
})
export class TaskModComponent implements OnInit {
  errorMsg='';
  categorias = null;
  colaboradores = null;
  tareas = null;

  equipos=null;

  //idTarea=null;

  taskModel = new Task('','',null,null,null,null,null,'',null);

  constructor(private _homeService:HomeServiceService, private router:Router) {
    this.getColaboradoresUser();
    this.getCategorias();
    this.obtenerEquipoUsuario();
    this.getTareasUser();
   }

  ngOnInit(): void {
  }

  // GET

  getCategorias(){
    this._homeService.getCategorias().subscribe(
      data => {
        (this.categorias = data)
        console.log("Categorias recibidas");
        console.log(data);
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
        console.log(data);
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir los colaboradores");
      }
    )
  }

  getTareasUser(){
    this._homeService.getTareasUser().subscribe(
      data => {
        (this.tareas = data)
        console.log("Tareas recibidas");
        console.log(data);
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir las tareas");
      }
    )
  }

  // POST

  onSubmit(){
    this._homeService.modTask(this.taskModel)
    .subscribe(
      data => console.log("Tarea modificada!", data),
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
