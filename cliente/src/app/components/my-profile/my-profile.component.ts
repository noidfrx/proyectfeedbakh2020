import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/Profile';
import {ProfileService} from '../../services/profileService/profile.service';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  datos: any;
  errorMsg='';
  amigos: any[];
  foto="";
  modoEdicion=false;
  nuevosDatos: Profile ={
    nombre:"",
    apellidos:"",
    email:"",
    fotoPerfil:0,

  };
  constructor( private ProfileService: ProfileService) { }

  ngOnInit() {
    this.ProfileService.datosUsuario().subscribe(
      res => { console.log(res);
        this.nuevosDatos.nombre=res[0].nombre;
        this.nuevosDatos.apellidos=res[0].apellidos;
        this.nuevosDatos.email=res[0].email;
        this.nuevosDatos.fotoPerfil=res[0].fotoPerfil;
        this.foto=this.ProfileService.fotoPerfil(this.nuevosDatos.fotoPerfil);
      },
      err => {
        this.errorMsg=err.statusText;
      }
    
    );

    this.ProfileService.amigos().subscribe(
      res => { console.log(res);
        this.amigos= res;
        console.log("mi foto es:", this.amigos[0].fotoPerfil);
      },
      err => {
        this.errorMsg=err.statusText;
      }
    );

    
  }


  onSubmit(){
    this.ProfileService.actualizarPerfil(this.nuevosDatos).subscribe(
      res => { console.log(res);
      },
      err => {
        this.errorMsg=err.statusText;
      }
    );
    this.modoEdicion=false;
   }
  
   cancelar(){
     this.modoEdicion=false;
   }
   editar(){
     this.modoEdicion=true;
  }

  cambiarFoto(id:number){
    this.foto=this.ProfileService.fotoPerfil(id);
    this.nuevosDatos.fotoPerfil=id;
  }
}