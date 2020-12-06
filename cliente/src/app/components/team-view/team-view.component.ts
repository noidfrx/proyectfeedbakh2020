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

  errorMsg='';                    // Mensaje que notifica un error
  categorias = null;              // Categorías de las tareas y eventos
  colaboradores = null;           // Colaboradores del usuario con sesión iniciada
  equipos=[];                     // Equipos en los que pertenece el usuario con sesión iniciada
  tareas=null;                    // Tareas del equipo seleccionado
  eventos=null;                   // Eventos del equipo seleccionado

  teamData=null;
  selectedTeam = null;            // ID del equipo seleccionado
  teamId = new IdBringer(null);   // Modelo que posee el ID y el nombre del equipo seleccionado
                                  // utilizado para realizar querys a la base de datos
  nombre_team='';
  member_selector = 0;            // ID del miembro seleccionado
  team_owner_checker = 0;         // Verificador si es miembro de un equipo

  constructor(private _homeService:HomeServiceService, private _equipoService:EquipoService, private router:Router) {
    this.getColaboradoresUser();
    this.getCategorias();
    this.obtenerEquipoUsuario();
   }

  ngOnInit(): void {

    /* Lo que hace este código es ver si desde otro lugar se apretó algún equipo para mostrar
       Si es cero o null, mostrará el último equipo creado 
       Si es algún número, se mostrará el equipo con esa id (número)*/
       let mostrarEquipo = this._homeService.getMostrarEquipo();

       if (mostrarEquipo==0 || mostrarEquipo==null){
         this.getLastTeam();
       }else{
         this.selectedTeam = mostrarEquipo;
         this.getTeamData();
       }
    
  }


  // Función para adquirir todas las categorías de la base de datos
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

  // Función para adquirir todos los colaboradores según el usuario con sesión iniciada
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

  // Función que llama a las funciones "getTareasTeam" y  "getEventosTeam"
  // para adquirir las tareas y eventos de un equipo seleccionado, respectivamente
  getTeamData(){
    this.teamId.id = this.selectedTeam;
    if (this.teamData == null){
      this.equipos.forEach(equipo => {
        if (equipo.nombreEquipo[0].idEquipo == this.selectedTeam){
          this.teamData = equipo.nombreEquipo[0];
        }
      });
    }
    
    console.log("TEAMID: ", this.teamId);

    this.checkTeamOwner();
    this.getTareasTeam();
    this.getEventosTeam();
    
    /*this._homeService.getTareasTeam(this.teamId).subscribe(
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
    )*/
  }

  // Función para adquirir las tareas según el equipo seleccionado
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

  getEventosTeam(){
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

  // Función para adquirir los eventos según el equipo seleccionado
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

  // Función para adquirir el último equipo en el que pertenezca el usuario con sesión iniciada
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

  // Función para agregar una tarea, redirigiendo hacia el formulario correspondiente
  addTask(){
    if (this.teamData == null){
      this.getTeamData();
    }
    let idteam = this.teamId.id;
    let nombreteam = this.teamData.nombre;
    this.router.navigate(['/taskadd'], { state: {idteam, nombreteam} });
  }

  // Función para modificar una tarea, redirigiendo hacia el formulario correspondiente
  modTask(idtask){
    if (this.teamData == null){
      this.getTeamData();
    }
    let idteam = this.teamId.id;
    let nombreteam = this.selectedTeam.nombre; //esto no funciona, selectedTeam es un número
    this.router.navigate(['/taskmod'], { state: {idtask,idteam,nombreteam} });
  }

  // Función para eliminar una tarea
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

  // Función para agregar un evento, redirigiendo hacia el formulario correspondiente
  addEvent(){
    if (this.teamData == null){
      this.getTeamData();
    }
    let idteam = this.teamId.id;
    console.log("ID  TEAM:",idteam);
    let nombreteam = this.teamData.nombre;
    this.router.navigate(['/eventadd'], { state: {idteam, nombreteam} });
  }

  // Función para modificar un evento, redirigiendo hacia el formulario correspondiente
  modEvent(idevent){
    if (this.teamData == null){
      this.getTeamData();
    }
    let idteam = this.teamId.id;
    let nombreteam = this.teamData.nombre;
    this.router.navigate(['/eventmod'], { state: {idevent, idteam, nombreteam} });
  }

  // Función para eliminar un evento
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

  // Función para agregar un miembro al equipo seleccionado
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

  // Función para verificar si el usuario con sesión iniciada es el encargado del equipo seleccionado
  checkTeamOwner(){
    this._homeService.checkTeamOwner(this.teamId).subscribe(
      data => {
        if(data != null && data.length > 0){
          this.team_owner_checker = data[0].encargado;
        }else{
          this.team_owner_checker = 0;
        }
        console.log("checkTeamOwner(data): ", data);
        console.log("team_owner_checker: ", this.team_owner_checker);
      },
      error => {
        this.team_owner_checker = 0;
        console.log("checkTeamOwner(error): ", error);
        console.log("team_owner_checker: ", this.team_owner_checker);
      }
    )
  }



  ///////////////////////
  // home.component.ts //
  ///////////////////////

  
  obtenerEquipoUsuario(){
    this._homeService.obtenerEquiposUsuario()
    .subscribe(
      data => {this.equipos = data;
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir los equipos");
      }
    )
  }


}
