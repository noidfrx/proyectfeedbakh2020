import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { IdBringer } from '../../models/IdBringer';
import { HomeServiceService } from 'src/app/services/homeService/home-service.service';
import { EquipoService } from 'src/app/services/equipoService/equipo.service';

//Para validación de formulario
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { listaEquipo } from 'src/app/models/listaEquipo';



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

  teamData = null;
  selectedTeam = null;
  teamId = new IdBringer(null);
  nombre_team='';
  member_selector = 0;

  constructor(private _homeService:HomeServiceService, private _equipoService:EquipoService, private router:Router) {
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
    this.teamId.id = this.selectedTeam;
    this.teamData.id = this.selectedTeam;
    //this.teamData.nombre = 
    console.log("TEAMID: ", this.teamId);
    this._homeService.getTareasTeam(this.teamId).subscribe(
      data => {
        (this.tareas = data)
        console.log("Tareas del usuario recibidas. ID: ", this.teamData);
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
        (this.tareas = null)
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
        (this.eventos = null)
        this.errorMsg=error.statusText;
        console.log("Error al recibir los eventos del usuario");
      }
    )
  }

  getLastTeam(){
    this._homeService.getLastTeam().subscribe(
      data => {
        (this.teamData = data)
        //this.nombre_team = this.equipos[this.selectedTeam]
        console.log("Ultimo equipo recibido: ", data);
        this.selectedTeam = this.teamData.idEquipo;
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
    let nombreteam = this.teamData.nombre;
    this.router.navigate(['/taskadd'], { state: {idteam, nombreteam} });
  }

  modTask(idtask){
    let idteam = this.teamId.id;
    let nombreteam = this.selectedTeam.nombre;
    this.router.navigate(['/taskmod'], { state: {idtask,idteam,nombreteam} });
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
    let idteam = this.teamId.id;
    let nombreteam = this.teamData.nombre;
    this.router.navigate(['/eventadd'], { state: {idteam, nombreteam} });
  }

  modEvent(idevent){
    let idteam = this.teamId.id;
    let nombreteam = this.teamData.nombre;
    this.router.navigate(['/eventmod'], { state: {idevent, idteam, nombreteam} });
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

  addMember(){
    let m = this.member_selector;
    let relacion = new listaEquipo(0,m,this.selectedTeam);
    this._equipoService.agregarIntegrante(relacion).subscribe(
      data => {
        console.log("Miembro agregado con éxito ", this.member_selector);
        alert("Miembro agregado al equipo");
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
