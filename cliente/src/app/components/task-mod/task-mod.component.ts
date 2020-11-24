import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {ActivatedRoute, Router, NavigationStart} from '@angular/router';
import {Task} from '../../models/Task';
import { IdBringer } from 'src/app/models/IdBringer';
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
  //colaboradores = null;
  //tareas = null;
  _tarea = new Task('',0,0,0,0,0,0,'',0);
  equipos=null;
  teamId = new IdBringer(null);
  //idTarea=null;

  taskModel = new Task('',0,null,null,null,null,null,'',null);

  constructor(private _homeService:HomeServiceService, private router:Router/*, private activatedRoute:ActivatedRoute*/) {
    //this.getColaboradoresUser();
    this.getCategorias();
    this.obtenerEquipoUsuario();
    //this.getTarea();
    //this.getTareasUser();
   }

  ngOnInit(): void {
    console.log("---TASKMOD---");
    this.teamId.id=history.state.id;
    console.log("idTarea: ",this.teamId.id);
    if(this.teamId.id){
      this.getTarea();
      //this.setSuciusFormularius();
      //console.log(this._tarea);
    }else{
      console.log("_tarea es null");
    }
  }

  setSuciusFormularius(){
    console.log("tarea usada para form: ", this._tarea);
    this.taskModel.tarea = this.teamId.id;
    this.taskModel.nombre = this._tarea[0].nombre;
    this.taskModel.encargado = this._tarea[0].idEncargado;
    this.taskModel.equipo = this._tarea[0].idEquipo;
    this.taskModel.dia = 1;
    this.taskModel.mes = 1;
    this.taskModel.anio = 1;
    this.taskModel.categoria = this._tarea[0].idCategoria;
    this.taskModel.descripcion = this._tarea[0].descripcion;
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

  /*getColaboradoresUser(){
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
  }*/

  /*getTareasUser(){
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
  }*/

  getTarea(){
    this._homeService.getTarea(this.teamId).subscribe(
      data => {
        (this._tarea = data)
        console.log("Tarea con id ", this.teamId.id, " recibida");
        console.log(data);
        this.setSuciusFormularius();
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir la tarea de id ", this.teamId);
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
