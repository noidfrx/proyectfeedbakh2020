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

  constructor(private _homeService: HomeServiceService,private router: Router) { 
    this.obtenerNombreUsuario();

  }


  ngOnInit(): void {
    this.idIngresado=history.state.id;
    this.nombreIngresado=history.state.nombre;
    console.log(this.idIngresado+" "+this.nombreIngresado);
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
