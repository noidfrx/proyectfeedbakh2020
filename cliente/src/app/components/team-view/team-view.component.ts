import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { IdBringer } from '../../models/IdBringer';
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

  selectedTeam = null;
  teamId = new IdBringer(null);
  nombre_team='';

  constructor(private _homeService:HomeServiceService, private router:Router) {
    this.getColaboradoresUser();
    this.getCategorias();
    this.obtenerEquipoUsuario();
    //this.getTareasTeam();
    //this.getEventosUser();
   }

  ngOnInit(): void {
    this.getLastTeam();
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

  getTeamData(){
    this.teamId.id = this.selectedTeam.idEquipo;
    console.log("TEAMID: ", this.teamId);
    this._homeService.getTareasTeam(this.teamId).subscribe(
      data => {
        (this.tareas = data)
        console.log("Tareas del usuario recibidas. ID: ", this.selectedTeam);
        console.log(data);
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir las tareas del usuario");
      }
    )
    this._homeService.getEventosTeam(this.teamId).subscribe(
      data => {
        (this.eventos = data)
        console.log("Eventos del usuario recibidos");
        console.log(data);
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir los eventos del usuario");
      }
    )
  }

  getTareasTeam(){
    this._homeService.getTareasTeam(this.teamId).subscribe(
      data => {
        (this.tareas = data)
        console.log("Tareas del usuario recibidas");
        console.log(data);
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
        console.log(data);
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir los eventos del usuario");
      }
    )
  }

  getLastTeam(){
    this._homeService.getLastTeam().subscribe(
      data => {
        (this.selectedTeam = data)
        //this.nombre_team = this.equipos[this.selectedTeam]
        console.log("Ultimo equipo recibido: ", data);
        console.log(data);
        this.getTeamData();
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir el ultimo equipo");
      }
    )
  }

  addTask(){
    let idteam = this.teamId.id;
    let nombreteam = this.selectedTeam.nombre;
    this.router.navigate(['/taskadd'], { state: {idteam, nombreteam} });
  }

  modTask(idTask){
    let idTeam = this.teamId.id;
    let nombreteam = this.selectedTeam.nombre;
    this.router.navigate(['/taskmod'], { state: {idTask,idTeam,nombreteam} });
  }

  banTask(id){
    let c = confirm("¿Está seguro que desea eliminar la tarea seleccionada?");
    if(c){
      this.teamId.id=id;
      this._homeService.banTask(this.teamId).subscribe(
        data => {
          console.log(data);
          alert("Tarea eliminada con éxito");
          setTimeout(() => 
          {
              this.router.navigate(['/uwu']);
          },
          500);
        },
        error => {
          this.errorMsg=error.statusText;
          console.log(error);
        }
      )
    }
  }

  addEvent(){
    let idTeam = this.teamId.id;
    let nombreteam = this.selectedTeam.nombre;
    this.router.navigate(['/eventadd'], { state: {idTeam, nombreteam} });
  }

  modEvent(idEvent){
    let idTeam = this.teamId.id;
    let nombreteam = this.selectedTeam.nombre;
    this.router.navigate(['/eventmod'], { state: {idEvent, idTeam, nombreteam} });
  }

  banEvent(id){
    let c = confirm("¿Está seguro que desea eliminar el evento seleccionado?");
    if(c){
      this.teamId.id=id;
      this._homeService.banEvent(this.teamId).subscribe(
        data => {
          console.log(data);
          alert("Evento eliminado con éxito");
          setTimeout(() => 
          {
            this.router.navigate(['/uwu']);
          },
          500);
        },
        error => {
          this.errorMsg=error.statusText;
          console.log(error);
        }
      )
    }
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
