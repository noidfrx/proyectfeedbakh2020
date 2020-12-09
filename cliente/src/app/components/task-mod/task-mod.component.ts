import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {ActivatedRoute, Router, NavigationStart} from '@angular/router';
import {Task} from '../../models/Task';
import { IdBringer } from 'src/app/models/IdBringer';
import {HomeServiceService} from '../../services/homeService/home-service.service'


//Para validación de formulario
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { AlertModTaskComponent } from '../box/alert-mod-task/alert-mod-task.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-task-mod',
  templateUrl: './task-mod.component.html',
  styleUrls: ['./task-mod.component.css']
})
export class TaskModComponent implements OnInit {
  errorMsg='';
  categorias = null;
  _tarea = new Task('',0,0,0,0,0,0,'',0,0);
  equipos=null;
  taskId = new IdBringer(null,null);
  teamId = new IdBringer(null,null);
  nombreteam='';
  colaboradores = null;

  taskModel = new Task('',0,0,null,null,null,null,'',null,0);

  constructor(private _homeService:HomeServiceService, private router:Router, public alertModTask:MatDialog) {
    this.teamId.id=history.state.idteam;
    this.nombreteam=history.state.nombreteam;
    this.getCategorias();
    this.obtenerEquipoUsuario();
    this.getColaboradoresTeam();
   }

  ngOnInit(): void {
    this.taskId.id=history.state.idtask;
    this.teamId.id=history.state.idteam;
    this.nombreteam=history.state.nombreteam;

    if(this.teamId.id == null){
      this.router.navigate(['/teamview']);
    }

    if(this.taskId.id){
      this.getTarea();
    }else{
      console.log("_tarea es null");
    }
  }

  setSuciusFormularius(){
    console.log("tarea usada para form: ", this._tarea);
    this.taskModel.tarea = this.taskId.id;
    this.taskModel.nombre = this._tarea[0].nombre;
    this.setEncargadoTarea(this.taskId);
    this.taskModel.equipo = this._tarea[0].idEquipo;
    this.taskModel.dia = this.getDia(this._tarea[0].fecha);
    this.taskModel.mes = this.getMes(this._tarea[0].fecha);
    this.taskModel.anio = this.getAnio(this._tarea[0].fecha);
    this.taskModel.categoria = this._tarea[0].idCategoria;
    this.taskModel.descripcion = this._tarea[0].descripcion;
  }

  /////////
  // GET //
  /////////

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

  getTarea(){
    this._homeService.getTarea(this.taskId).subscribe(
      data => {
        (this._tarea = data)
        console.log("Tarea con id ", this.taskId.id, " recibida");
        console.log(data);
        this.setSuciusFormularius();
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir la tarea de id ", this.taskId);
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

  //////////
  // POST //
  //////////

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

  setEncargadoTarea(taskId){
    this._homeService.getEncargadoTarea(taskId).subscribe(
      data => {
        this.taskModel.encargado = data[0].idColaborador;
        console.log("Colaborador adquirido (ID): ", data);
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir el colaborador");
      }
    )
  }

  onSubmit(){
    this.taskModel.equipo = this.teamId.id;
    console.log("formulario enviado -> ", this.taskModel);
    this._homeService.modTask(this.taskModel)
    .subscribe(
      data => {
        console.log("Tarea modificada!", data);
        //alert("Tarea modificada con éxito");
        this.alertModTask.open(AlertModTaskComponent);
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

  cancelar(){
    this._homeService.setMostrarEquipo(this.teamId.id);
    this.router.navigate(['/teamview']); 
  }


}
