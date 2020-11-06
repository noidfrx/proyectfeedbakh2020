import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HomeServiceService} from '../../services/homeService/home-service.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit { 
  idIngresado:any;
  nombreIngresado:any;
  errorMsg='';
  nombreUsuario='';
  equipos='';
  hayEquipos=1;

  constructor(private _homeService: HomeServiceService,private router: Router) { 
    this.obtenerNombreUsuario();
    this.obtenerEquipoUsuario();

  }


  ngOnInit(): void {
    this.idIngresado=history.state.id;
    this.nombreIngresado=history.state.nombre;
    /*console.log(this.idIngresado+" "+this.nombreIngresado);*/
  }


  obtenerNombreUsuario(){
    this._homeService.obtenerNombreUsuario()
      .subscribe(

        //Si me devuelve okay
        data => {
          //La sesión ha sido iniciada correctamente
          console.log(data);
          this.nombreUsuario=data.message;

        },
        error => {
          this.errorMsg = error.statusText;
          console.log("Error, no se recibió nombre de usuario")
        }
      
      );

  }

  obtenerEquipoUsuario(){
    this._homeService.obtenerEquiposUsuario()
    .subscribe(
      data => {
        if (data!=null){  
          this.equipos = data;
        }else{
          this.hayEquipos = 0;
        }
        console.log(this.equipos);
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("Error al recibir los equipos");
      }
    )
  }
  

  cerrarSesion(){
    this._homeService.logout().subscribe(
      data=>{
        console.log("Dato recibido de servidor: "+data.message);
        this.router.navigateByUrl('/welcome');
      },
      error=>{
        this.errorMsg = error.statusText
        console.log("Error, no se recibe data")
      }
    );
  }

}
