import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Task} from '../../models/Task';
import {TaskMakerService} from '../../services/taskmakerService/taskmaker.service';

//Para validación de formulario
import {FormControl,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-task-maker',
  templateUrl: './task-maker.component.html',
  styleUrls: ['./task-maker.component.css']
})
export class TaskMakerComponent implements OnInit {
  errorMsg='';
  categorias = null;
  colaboradores = null;

  equipos=null;

  taskModel = new Task('','',null,null,null,null,null,'');

  constructor(private _taskmakerService:TaskMakerService, private router:Router) {
    this.getColaboradores();
    this.getCategorias();
    //this.getEquipos();
    this.obtenerEquipoUsuario();
   }

  ngOnInit(): void {
  }

  // GET

  /*
  getLogin(){
    this._taskmakerService.getLogin().subscribe(
      data => {
        (this.categorias = data)
        console.log("Equipos recibidos");
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir los equipos");
      }
    )
  }
*/
  
  /*getEqipos(){
    this._taskmakerService.getEquipos().subscribe(
      data => {
        (this.categorias = data)
        console.log("Equipos recibidos");
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir los equipos");
      }
    )
  }*/
  

  getCategorias(){
    this._taskmakerService.getCategorias().subscribe(
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
    this._taskmakerService.getColaboradores().subscribe(
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
    this._taskmakerService.addTask(this.taskModel)
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
    this._taskmakerService.obtenerEquiposUsuario()
    .subscribe(
      data => {(this.equipos = data)},
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir los equipos");
      }
    )
  }
  

}
