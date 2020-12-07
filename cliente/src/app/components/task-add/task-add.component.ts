import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Task} from '../../models/Task';
import {HomeServiceService} from '../../services/homeService/home-service.service'
import { IdBringer } from 'src/app/models/IdBringer';

//Para validación de formulario
import {FormControl,FormGroup,Validators} from '@angular/forms';


@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {
  errorMsg='';
  categorias = null;
  colaboradores = null;

  equipos=null;

  teamId = new IdBringer(null,null);
  nombreteam = '';
  taskModel = new Task('',0,0,null,0,null,0,'',null,0);

  constructor(private _homeService:HomeServiceService, private router:Router) {
    this.teamId.id=history.state.idteam;
    this.nombreteam=history.state.nombreteam;
    this.getColaboradoresTeam();
    this.getCategorias();
    //this.obtenerEquipoUsuario();
   }

  ngOnInit(): void {
    this.teamId.id=history.state.idteam;
    this.nombreteam=history.state.nombreteam;
    if(this.teamId.id == null){
      this.router.navigate(['/teamview']);
    }
    console.log("idteam: ", this.teamId.id);
    console.log("nombreteam: ", this.nombreteam);
  }

  /////////
  // GET //
  /////////

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

  //////////
  // POST //
  //////////

  onSubmit(){
    this.taskModel.equipo = this.teamId.id;
    if(this.taskModel.encargado == 0){
      alert("Debe seleccionar un integrante");
    }else{
      this._homeService.addTask(this.taskModel)
      .subscribe(
        data => {
          console.log("Tarea agregada!", data);
          alert("Tarea creada con éxito");
          setTimeout(() => 
          {
              this._homeService.setMostrarEquipo(this.teamId.id);
              this.router.navigate(['/teamview']); 
          },
          500);
        },
        error => {this.errorMsg = error.statusText}
        // Manejo de errores ^
      )
    }
  }

  cancelar(){
    this._homeService.setMostrarEquipo(this.teamId.id);
    this.router.navigate(['/teamview']); 
  }

  ///////////////////////
  // home.component.ts //
  ///////////////////////

  
  /*obtenerEquipoUsuario(){
    this._homeService.obtenerEquiposUsuario()
    .subscribe(
      data => {(this.equipos = data)},
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir los equipos");
      }
    )
  }*/
  
}
