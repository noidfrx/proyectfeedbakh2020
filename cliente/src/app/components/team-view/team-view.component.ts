import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { IdBringer } from '../../models/IdBringer';
import { Task } from 'src/app/models/Task';
import { HomeServiceService } from 'src/app/services/homeService/home-service.service';
import { EquipoService } from 'src/app/services/equipoService/equipo.service';

import {MatDialog} from '@angular/material/dialog';
import { formatDate } from '@angular/common';

import { listaEquipo } from 'src/app/models/listaEquipo';

import { AlertAddMemberComponent } from '../box/alert-add-member/alert-add-member.component';
import { AlertMemberExistsComponent } from '../box/alert-member-exists/alert-member-exists.component';
import { AlertBanMemberComponent } from '../box/alert-ban-member/alert-ban-member.component';
import { AlertBanTeamComponent } from '../box/alert-ban-team/alert-ban-team.component';
import { AlertBanTaskComponent } from '../box/alert-ban-task/alert-ban-task.component';
import { AlertTaskDoneComponent } from '../box/alert-task-done/alert-task-done.component';
import { AlertTaskUndoneComponent } from '../box/alert-task-undone/alert-task-undone.component';
import { AlertBanEventComponent } from '../box/alert-ban-event/alert-ban-event.component';
import { ConfirmBanEventComponent } from '../box/confirm-ban-event/confirm-ban-event.component';
import { ConfirmBanMemberComponent } from '../box/confirm-ban-member/confirm-ban-member.component';
import { ConfirmBanTeamComponent } from '../box/confirm-ban-team/confirm-ban-team.component';
import { ConfirmBanTaskComponent } from '../box/confirm-ban-task/confirm-ban-task.component';



@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.css']
})
export class TeamViewComponent implements OnInit {
  errorMsg='';                    // Mensaje que notifica un error
  categorias = null;              // Categorías de las tareas y eventos
  categorias_map = null;          // Mapa reordenado de las categorias
  colaboradores = null;           // Colaboradores del usuario (amigos)
  colaboradores_team = null;      // Colaboradores del equipo seleccionado
  colaboradores_noteam = null;    // Colaboradores agregados que no pertenecen al equipo seleccionado
  colaboradores_map = null;       // Mapa reordenado de los colaboradores adquiridos
  //colaboradoresteam_map = null;   // Mapa reordenado de los colaboradores de un equipo
  tareacolab_map = null;          // Mapa reordenado de los colaboradores de un equipo
  equipos=[];                     // Equipos en los que pertenece el usuario con sesión iniciada
  tareas=null;                    // Tareas del equipo seleccionado
  eventos=null;                   // Eventos del equipo seleccionado

  teamData=null;                  // Objeto que adquiere el nombre e ID del equipo
  selectedTeam = null;            // ID del equipo seleccionado
  lista_tareas = [];              // Objeto para recibir datos de la tabla listatareas
  lista_eventos = [];             // Objeto para recibir datos de la tabla listaeventos
  lista_tareas_team = [];         // Objeto que contiene las tareas de un equipo
  lista_eventos_team = [];        // Objeto que contiene los eventos de un equipo

  teamId = new IdBringer(null,null);          // Modelo que posee el ID y el nombre del equipo seleccionado,
                                              // utilizado para realizar querys a la base de datos

  encargadoId = new IdBringer(null,null);     // Modelo que posee el ID del encargado seleccionado,
                                              // utilizado para realizar querys a la base de datos

  taskId = new IdBringer(null,null);          // Modelo que posee el ID de la tarea seleccionada,
                                              // utilizado para realizar querys a la base de datos

  _tarea = new Task('',0,0,null,0,'',0,0);   // Modelo creado para adquirir datos de una tarea

  nombre_encargado = '';
  nombre_team='';
  objetivo_team='';
  member_selector = 0;            // ID del miembro seleccionado
  team_owner_checker = 0;         // Verificador si es propietario de un equipo
  team_member_checker = 1;        // Verificador si es miembro de un equipo

  constructor(private _homeService:HomeServiceService, 
              private _equipoService:EquipoService, 
              private router:Router, 
              public alertAddMember:MatDialog,
              public alertAddTeam:MatDialog,
              public alertBanEvent:MatDialog,
              public alertBanMember:MatDialog,
              public alertBanTeam:MatDialog,
              public alertBanTask:MatDialog,
              public alertTaskDone:MatDialog,
              public alertTaskUndone:MatDialog,
              public alertMemberExists:MatDialog,
              public confirmBanEvent:MatDialog,
              public confirmBanMember:MatDialog,
              public confirmBanTask:MatDialog,
              public confirmBanTeam:MatDialog) 
  {
    this.getListaTareas();
    this.getListaEventos();
    this.getColaboradoresUser();
    this.getColaboradoresTeam();
    this.getCategorias();
    this.obtenerEquipoUsuario();
   }

  ngOnInit(): void {

    /* Lo que hace esta parte es ver si desde otro lugar se apretó algún equipo para mostrar
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

                              ///////////////////////////////
                              //                           //
////////////////////////////////    FUNCIONES DE EQUIPO    ////////////////////////////////
                              //                           //
                              ///////////////////////////////






  // Función para adquirir todos los colaboradores según el usuario con sesión iniciada
  getColaboradoresUser(){
    this._homeService.getColaboradoresUser().subscribe(
      data => {
        (this.colaboradores = data)
        // Luego de adquirir los colaboradores, se reordenaran en un mapa para su facil acceso
        // (para tomar el nombre de los encargados a traves del ID)
        this.reordenarColaboradores();
        console.log("Colaboradores recibidos: ", data);
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir los colaboradores");
      }
    )
  }


  // Función que llama a las funciones "getTareasTeam", "getEventosTeam" y "checkTeamOwner"
  // para adquirir las tareas y eventos de un equipo seleccionado y saber si es encargado, respectivamente
  getTeamData(){
    this.teamId.id = this.selectedTeam;
    //this.nombre_team = this.teamData.nombre;
    console.log("teamData -> ", this.teamData);
    if (this.teamData == null){
      this.equipos.forEach(equipo => {
        if (equipo.nombreEquipo[0].idEquipo == this.selectedTeam){
          this.teamData = equipo.nombreEquipo[0];
          console.log("equipo.nombreEquipo[0", this.teamData);
        }
      });
    }


    // Query para actualizar el objeto teamData
    this._homeService.getTeamData(this.teamId).subscribe(
      data => {
        (this.teamData = data)
        console.log("Datos del equipo: ", data);
        this.selectedTeam = this.teamData[0].idEquipo;
        this.nombre_team = this.teamData[0].nombre;
        this.objetivo_team = this.teamData[0].objetivo;
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir los datos del equipo");
      }
    )
    
    console.log("TEAMID: ", this.teamId);

    if(this.selectedTeam != 0){
      this.checkTeamOwner();
      this.getTareasTeam();
      this.getEventosTeam();
      this.getColaboradoresTeam();
    }
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


  // Funcion para adquirir los colaboradores de un equipo
  getColaboradoresTeam(){
    this._homeService.getColaboradoresTeam(this.teamId).subscribe(
      data => {
        (this.colaboradores_team = data)
        console.log("Colaboradores (team) recibidos: ", data);
        //this.reordenarColaboradoresTeam();
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir los colaboradores (team)");
      }
    )
  }


  // Funcion que redirigire al formulario de creacion de equipos
  crearEquipo(){
    this.router.navigate(['/crearEquipo']);
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


  // Función para agregar un miembro al equipo seleccionado
  addMember(){
    let relacion = new listaEquipo(0,this.member_selector,this.selectedTeam);

    if(!this.checkTeamMember(this.member_selector)){
      this._equipoService.agregarIntegrante(relacion).subscribe(
        data => {
          console.log("Miembro agregado con éxito ", this.member_selector);
          //alert("Miembro agregado al equipo");
          this.alertAddMember.open(AlertAddMemberComponent);
          setTimeout(() => 
          {
              this._homeService.setMostrarEquipo(this.selectedTeam);
              this.router.navigate(['/uwu']);
          },
          500);
        },
        error => {
          this.errorMsg=error.statusText;
          console.log(error);
        }
      )
    }else{
      //alert("El colaborador ya pertenece a este equipo!");
      this.alertMemberExists.open(AlertMemberExistsComponent);
    }
    

  }


  // Funcion para adquirir los colaboradores que no pertenecen al equipo
  checkTeamMember(idColab): boolean{
    var getColab = null;

    if(this.colaboradores_team!=null){
      for(let colaborador of this.colaboradores_team){
        if(colaborador.idColaborador == idColab){
          console.log("Colab encontrado!");
          return true;
        }
      }
    }
    console.log("Colab NO encontrado!");
    return false;
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
        console.log("team_owner_checker: ", this.team_owner_checker);
      },
      error => {
        this.team_owner_checker = 0;
        console.log("checkTeamOwner(error): ", error);
        console.log("team_owner_checker: ", this.team_owner_checker);
      }
    )
  }



  // Función para sacar a un miembro de un equipo
  expulsarMiembro(idColab, nombre, apellidos){
    //var confirmar = confirm("Se eliminará al miembro seleccionado del equipo. ¿Desea continuar?");
    var confirmar = false;
    let confirmarBox = this.confirmBanMember.open(ConfirmBanMemberComponent);
    confirmarBox.afterClosed().subscribe(result =>{
      confirmar = result;

      console.log("after " + confirmar);
      if(confirmar){
        var idBringer = new IdBringer(this.selectedTeam,idColab);

        this._homeService.expulsarMiembroEquipo(idBringer).subscribe(
          data => {
            console.log(data);
            //alert("Miembro expulsado del equipo");
            this.alertBanMember.open(AlertBanMemberComponent);
            setTimeout(() => 
            {
              this.router.navigate(['/uwu']);
            },
            500);
          },
          error => {
            this.errorMsg=error.statusText;
            console.log(this.errorMsg);
          }
        )
        
      }

    });
  }




  // Función para sacar a un miembro de un equipo
  eliminarEquipo(){
    //var confirmar = confirm("Se eliminará el equipo. ¿Continuar?");
    var confirmar = false;
    let confirmarBox = this.confirmBanTeam.open(ConfirmBanTeamComponent);
    confirmarBox.afterClosed().subscribe(result => {
      confirmar = result;

      if(confirmar){
        var taskBringer = new IdBringer(this.teamData[0].idEquipo,null);
  
        this._homeService.banTeam(taskBringer).subscribe(
          data => {
            console.log(data);
            //alert("Equipo eliminado");
            this.alertBanTeam.open(AlertBanTeamComponent);
            setTimeout(() => 
            {
              this.router.navigate(['/uwu']);
            },
            500);
          },
          error => {
            this.errorMsg=error.statusText;
            console.log(this.errorMsg);
          }
        )
        
      }
    });


    
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




  
                                ///////////////////////////////
                                //                           //
  ////////////////////////////////    FUNCIONES DE TAREAS    ////////////////////////////////
                                //                           //
                                ///////////////////////////////





  // Función para adquirir la tabla listatareas
  getListaTareas(){
    this._homeService.getListaTareas().subscribe(
      data => {
        (this.lista_tareas = data)
        console.log("Tabla lista_tareas recibidas");
      },
      error => {
        (this.lista_tareas = null)
        this.errorMsg=error.statusText;
        console.log("Error al recibir la tabla lista_tareas");
      }
    )
  }




  // Función para adquirir las tareas según el equipo seleccionado
  getTareasTeam(){
    this._homeService.getTareasTeam(this.teamId).subscribe(
      data => {
        (this.tareas = data)
        console.log("Tareas del equipo recibidas");
        console.log(data);
      },
      error => {
        (this.tareas = null)
        this.errorMsg=error.statusText;
        console.log("Error al recibir las tareas del equipo");
      }
    )
  }


  // Función para agregar una tarea, redirigiendo hacia el formulario correspondiente
  addTask(){
    if (this.teamData == null){
      this.getTeamData();
    }
    let idteam = this.selectedTeam;
    let nombreteam = this.nombre_team;
    this.router.navigate(['/taskadd'], { state: {idteam, nombreteam} });
  }

  // Función para modificar una tarea, redirigiendo hacia el formulario correspondiente
  modTask(idtask){
    if (this.teamData == null){
      this.getTeamData();
    }
    let idteam = this.selectedTeam;
    let nombreteam = this.nombre_team;
    this.router.navigate(['/taskmod'], { state: {idtask,idteam,nombreteam} });
  }

  // Función para eliminar una tarea
  banTask(id){
    //let c = confirm("¿Está seguro que desea eliminar la tarea seleccionada?");
    var confirmar = false;
    let confirmarBox = this.confirmBanTask.open(ConfirmBanTaskComponent);
    confirmarBox.afterClosed().subscribe(result =>{
      confirmar = result;

      if(confirmar){
        this.teamId.id=id;
        this._homeService.banTask(this.teamId).subscribe(
          data => {
            console.log(data);
            //alert("Tarea eliminada con éxito");
            this.alertBanTask.open(AlertBanTaskComponent);
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
    });

    
  }



  // Función para habilitar el botón de "completar tarea",
  // solo si no se ha completado, y el usuario con sesión iniciada es el encargado
  setCompletado(idTarea){
    var taskId = new IdBringer(idTarea,null);

    this._homeService.setCompletado(taskId).subscribe(
      data => {
        console.log(data);
        //alert("Tarea marcada como completada!");
        this.alertTaskDone.open(AlertTaskDoneComponent);
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

  // Función para habilitar el botón de "completar tarea",
  // solo si no se ha completado, y el usuario con sesión iniciada es el encargado
  setNoCompletado(idTarea){
    var taskId = new IdBringer(idTarea,null);

    this._homeService.setNoCompletado(taskId).subscribe(
      data => {
        console.log(data);
        //alert("Tarea marcada como no completada!");
        this.alertTaskUndone.open(AlertTaskUndoneComponent);
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

  // Función para obtener el nombre de un encargado de una tarea
  getNombreEncargadoTarea(idTarea){
    var encargado = null;
    for(let task of this.tareas){
      if(task.idTarea == idTarea){
        for(let task_lt of this.lista_tareas){
          if(task.idTarea == task_lt.idTarea){
            encargado = task_lt;
          }
        }
      }
    }

    var nombre_encargado = null;
    
    for(let colab of this.colaboradores_team){
      //console.log("intentando... ", colab);
      if(encargado.idColaborador == colab.idColaborador){
        nombre_encargado = colab.nombre + " " + colab.apellidos;
        //console.log("colab.nombre: ", colab.nombre);
      }
    }

    //console.log("nombreencargado: ", nombre_encargado);
    if(nombre_encargado != null){
      return nombre_encargado;
    }else{
      return null;
    }
    
  }






                                ////////////////////////////////
                                //                            //
  ////////////////////////////////    FUNCIONES DE EVENTOS    ////////////////////////////////
                                //                            //
                                ////////////////////////////////




  // Función para adquirir las tareas según el equipo seleccionado
  getListaEventos(){
    this._homeService.getListaEventos().subscribe(
      data => {
        (this.lista_eventos = data)
        console.log("Tabla lista_eventos recibida");
      },
      error => {
        (this.lista_eventos = null)
        this.errorMsg=error.statusText;
        console.log("Error al recibir la tabla lista_eventos");
      }
    )
  }




  // Función para adquirir los eventos de un equipo
  getEventosTeam(){
    this._homeService.getEventosTeam(this.teamId).subscribe(
      data => {
        (this.eventos = data)
        console.log("Eventos del equipo recibidos");
        console.log(data);
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir los eventos del equipo");
      }
    )
  }


  // Función para agregar un evento, redirigiendo hacia el formulario correspondiente
  addEvent(){
    if (this.teamData == null){
      this.getTeamData();
    }
    let idteam = this.selectedTeam;
    let nombreteam = this.nombre_team;
    this.router.navigate(['/eventadd'], { state: {idteam, nombreteam} });
  }


  // Función para modificar un evento, redirigiendo hacia el formulario correspondiente
  modEvent(idevent){
    if (this.teamData == null){
      this.getTeamData();
    }
    let idteam = this.selectedTeam;
    let nombreteam = this.nombre_team;
    this.router.navigate(['/eventmod'], { state: {idevent, idteam, nombreteam} });
  }


  // Función para eliminar un evento
  banEvent(id){
    //let c = confirm("¿Está seguro que desea eliminar el evento seleccionado?");
    var confirmar = false;
    let confirmarBox = this.confirmBanEvent.open(ConfirmBanEventComponent);
    confirmarBox.afterClosed().subscribe(result =>{
      confirmar = result;

      if(confirmar){
        this.teamId.id=id;
        this._homeService.banEvent(this.teamId).subscribe(
          data => {
            console.log(data);
            //alert("Evento eliminado con éxito");
            this.alertBanEvent.open(AlertBanEventComponent);
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
    });

    
  }

  // Función para obtener la hora de un evento
  /*getHora(idEvento) : number{
    let eventoHora;
    for(let evento of this.eventos){
      if(evento.idEvento == idEvento){
        eventoHora = evento;
      }
    }

    return eventoHora.hora;
  }*/


  // Función que retorna a los participantes de un evento
  getNombresEncargadosEvento(idEvento){

    var encargadosId = [];
    for(let event of this.eventos){
      if(event.idEvento == idEvento){
        for(let event_lt of this.lista_eventos){
          if(event.idEvento == event_lt.idEvento){
            encargadosId.push(event_lt.idColaborador);
          }
        }
      }
    }

    var nombres_encargados = [];
    for(let colab of this.colaboradores_team){
      for(let encId of encargadosId){
        if(encId == colab.idColaborador){
          nombres_encargados.push(colab.nombre + " " + colab.apellidos); 
        }
      }
    }
    var nombres_string = '';

    let i = 0;
    for(let nombre of nombres_encargados){
      if(i == 1){
        nombres_string = nombres_string.concat(", ");
      }
      nombres_string = nombres_string.concat(nombre);
      i = 1;
    }

    if(nombres_encargados.length > 0){
      return nombres_string;
    }else{
      return "";
    }
    
  }

  







                                ////////////////////////////////
                                //                            //
  ////////////////////////////////    FUNCIONES AUXILIARES    ////////////////////////////////
                                //                            //
                                ////////////////////////////////






  

  // Función para reordenar los colaboradores en un mapa para adquirir sus nombres completos directamente desde su ID
  reordenarColaboradores(){
    let colab_map = new Map<number, string>();
    let id;
    let nombre;
    let apellidos;
    let nombre_completo;
    
    for(let elem of this.colaboradores){
      id = elem.idColaborador[0].idColaborador;
      nombre = elem.nombreColaborador[0].nombre;
      apellidos = elem.apellidosColaborador[0].apellidos;
      nombre_completo = nombre + " " + apellidos;
      colab_map.set(id, nombre_completo.toString());
    }
    console.log("this.colaboradores", colab_map);
    this.colaboradores_map = colab_map;
  }

  // Función para reordenar los colaboradores de un equipo en un mapa para adquirir sus nombres completos directamente desde su ID
  /*reordenarColaboradoresTeam(){
    let colab_map = new Map<number, string>();
    let id;
    let nombre;
    let apellidos;
    let nombre_completo;
    
    for(let elem of this.colaboradores_team){
      id = elem.idColaborador;
      nombre = elem.nombre;
      apellidos = elem.apellidos;
      nombre_completo = nombre + " " + apellidos;
      colab_map.set(id, nombre_completo.toString());
    }
    this.colaboradoresteam_map = colab_map;
  }*/

  // Función para reordenar los colaboradores en un mapa para adquirir sus nombres completos directamente desde su ID
  reordenarCategorias(){
    let cat_map = new Map<number, string>();
    let id;
    let nombre;
    
    for(let elem of this.categorias){
      id = elem.idCategoria[0].idCategoria;
      nombre = elem.nombreCategoria[0].nombreCategoria;
      cat_map.set(id, nombre);
    }
    console.log("this.categorias: ", cat_map);
    this.categorias_map = cat_map;
  }


  // Función para obtener el nombre de una categoria
  getNombreCategoria(idCategoria){
    return this.categorias_map.get(idCategoria);
  }

  

  // Función para obtener la fecha en formato día/mes/año
  getFecha(date){
    return formatDate(date, 'dd/MM/yyyy', 'en-US');
  }

  getHora(date){
    return formatDate(date, 'H:mm', 'en-US'); //no tiene la hora, la hora esta guardada en un campo específico.
  }

  // Función para adquirir todas las categorías de la base de datos
  getCategorias(){
    this._homeService.getCategorias().subscribe(
      data => {
        (this.categorias = data)
        // Luego de adquirir las categorias, se reordenaran en un mapa para su facil acceso
        // (para tomar el nombre de las categorias a traves del ID)
        this.reordenarCategorias();
        console.log("Categorias recibidas: ", data);
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir las categorias");
      }
    )
  }


  ////////////////////////////////////////
  // Funciones auxiliarea para getFecha //
  ////////////////////////////////////////

  /*getDia(dat){
    var date = String(dat);
    var fecha = date.split('T',2);
    var fecha2 = fecha[0].split('-',3);
    var dia = fecha2[2];

    return dia;
  }

  getMes(dat){
    var date = String(dat);
    var fecha = date.split('T',2);
    var fecha2 = fecha[0].split('-',3);
    var dia = fecha2[1];

    return dia;
  }

  getAnio(dat){
    var date = String(dat);
    var fecha = date.split('T',2);
    var fecha2 = fecha[0].split('-',3);
    var dia = fecha2[0];

    return dia;
  }*/

  ////////////////////////////////////////////////////////////////

  // Función para habilitar el botón de "completar tarea",
  // solo si no se ha completado, y el usuario con sesión iniciada es el encargado
  /*checkTaskOwner(idTarea){
    var taskId = new IdBringer(idTarea);

    this._homeService.checkTaskOwner(taskId).subscribe(
      data => {
        console.log("checkTaskOwner(idTarea): ", taskId.id);
        if(data == null || data.length == 0){
          console.log("false");
          return false;
        }else{
          console.log("true");
          return true;
        }
      }
    )
  }*/

  


  


}
