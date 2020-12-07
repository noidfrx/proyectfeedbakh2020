import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/Profile';
import { ProfileService } from 'src/app/services/profileService/profile.service';

@Component({
  selector: 'app-buscar-usuarios',
  templateUrl: './buscar-usuarios.component.html',
  styleUrls: ['./buscar-usuarios.component.css']
})
export class BuscarUsuariosComponent implements OnInit {

  constructor( private buscar:ProfileService, private route:Router) {   }

  busqueda:Profile = {
    id:null,
    nombre:null,
    apellidos:null,
    email:null,
  };
  usuarios: any = [];
  idUser: any;
  errorMsg: string;
  mostrar:number=0;

  ngOnInit(): void {
    this.buscar.datosUsuario().subscribe(
      data =>{
        this.idUser=data[0].idColaborador;
      }, error => {
        this.errorMsg = error.statusText;
      }
    )
  }

  onSubmit(){
 
    this.buscar.buscarUsuario(this.busqueda).subscribe(
      data =>{
        this.usuarios=data;
        this.queMuestro();
      }, error => {
        this.errorMsg = error.statusText;
      }
      // Manejo de errores ^
    )
    
  }

  queMuestro(){
    if(!this.usuarios){
        this.mostrar=2;
    }else{
      this.mostrar=1
    }
  }

  volver(){
    this.route.navigate(['/my-profile']);
  }

}
