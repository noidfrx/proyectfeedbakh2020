import { Component, OnInit } from '@angular/core';
import {EquipoService} from '../../services/equipoService/equipo.service';
import { Equipo } from 'src/app/models/Equipo';
@Component({
  selector: 'app-create-work-team',
  templateUrl: './create-work-team.component.html',
  styleUrls: ['./create-work-team.component.css']
})
export class CreateWorkTeamComponent implements OnInit {

  errorMsg='';
  nuevoEquipo:Equipo = {
    nombre:"",
    objetivo:"" 
  };

  constructor( private equipo: EquipoService) { }

  ngOnInit(): void {

  }

  onSubmit(){
    this.equipo.ingresar(this.nuevoEquipo).subscribe(
      data => console.log("Data registro correcta!", data),
      error => this.errorMsg = error.statusText
      // Manejo de errores ^
    )
  }

}
