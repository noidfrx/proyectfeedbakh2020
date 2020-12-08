import { Component, OnInit } from '@angular/core';
import {EquipoService} from '../../services/equipoService/equipo.service';
import {HomeServiceService} from '../../services/homeService/home-service.service';
import { Equipo } from 'src/app/models/Equipo';
import {listaEquipo} from 'src/app/models/listaEquipo';
import {Router} from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-create-work-team',
  templateUrl: './create-work-team.component.html',
  styleUrls: ['./create-work-team.component.css']
})
export class CreateWorkTeamComponent implements OnInit {

  errorMsg='';
  equipoCreado='false';
  funciona='false';
  nuevoEquipo:Equipo = {
    nombre:"",
    objetivo:"" 
  };

  nuevarelacion:listaEquipo ={
    encargado: 1,
    idColaborador: 0,
  }

  constructor( private _homeService: HomeServiceService, private equipo: EquipoService, private route:Router, private location: Location) { 

  }

  ngOnInit(): void {

  }

  
  buscaridEquipo(data:any){
    this.equipo.buscarUltimoEquipo().subscribe(
      data=> {
        this.agregarIntegrantes(data);
        this._homeService.setMostrarEquipo(data);
        this.route.navigate(['/teamview']);
      
      },
      error=> this.errorMsg = error.statisText
    )
  }

  agregarIntegrantes(data:any){
    this.nuevarelacion.idEquipo=data;
    
    this.equipo.agregarIntegrante(this.nuevarelacion).subscribe(
      data => console.log('dato creado',data),
      error=> this.errorMsg= error.statisText
    )

  }

  cancelar(){
    this.location.back();
  }


  onSubmit(){

   this.equipo.ingresar(this.nuevoEquipo).subscribe(
      data => this.buscaridEquipo(data),
      error => this.errorMsg = error.statusText
      // Manejo de errores ^
    )
     

  }



}
