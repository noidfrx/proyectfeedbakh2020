import { Component, OnInit } from '@angular/core';
import {EquipoService} from '../../services/equipoService/equipo.service';
import { Equipo } from 'src/app/models/Equipo';
import {listaEquipo} from 'src/app/models/listaEquipo';
import { error } from 'protractor';


@Component({
  selector: 'app-create-work-team',
  templateUrl: './create-work-team.component.html',
  styleUrls: ['./create-work-team.component.css']
})
export class CreateWorkTeamComponent implements OnInit {

  errorMsg='';
  equipoCreado='false'
  nuevoEquipo:Equipo = {
    nombre:"",
    objetivo:"" 
  };

  nuevarelacion:listaEquipo ={
    encargado: '1',
    idColaborador: '1',
    idEquipo: '2'
  }

  constructor( private equipo: EquipoService) { }

  ngOnInit(): void {

  }

  onSubmit(){
    this.equipo.ingresar(this.nuevoEquipo).subscribe(
      data => this.equipoCreado=data,
      error => this.errorMsg = error.statusText
      // Manejo de errores ^
    )

    if(this.equipoCreado){
      this.equipo.agregarIntegrante(this.nuevarelacion).subscribe(
        data => console.log('dato creado',data),
        error=> this.errorMsg= error.statisText
      )
          
    }
  }

}
