import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/Profile';
import { ProfileService } from 'src/app/services/profileService/profile.service';

@Component({
  selector: 'app-buscar-usuarios',
  templateUrl: './buscar-usuarios.component.html',
  styleUrls: ['./buscar-usuarios.component.css']
})
export class BuscarUsuariosComponent implements OnInit {

  constructor( private buscar:ProfileService) {   }

  busqueda:Profile = {
    id:null,
    nombre:null,
    apellidos:null,
    email:null,
  };
  usuarios: any = [];
  errorMsg: string;

  ngOnInit(): void {
  }

  onSubmit(){
    console.log('datos a buscar',this.busqueda);
    this.buscar.buscarUsuario(this.busqueda).subscribe(
      data =>{
        console.log('data: ',data);
        this.usuarios=data;

      }, error => {
        this.errorMsg = error.statusText;
      }
      // Manejo de errores ^
    )
    console.log('esto recibe la funcion', this.usuarios);
  }

  queMuestro(){
    if(this.usuarios){
        console.log('se encontraron usuarios');
    }else{
        console.log('no se encontraron usuarios')
    }
  }

}
