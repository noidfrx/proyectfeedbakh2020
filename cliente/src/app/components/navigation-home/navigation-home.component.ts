import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HomeServiceService} from '../../services/homeService/home-service.service'

@Component({
  selector: 'app-navigation-home',
  templateUrl: './navigation-home.component.html',
  styleUrls: ['./navigation-home.component.css']
})
export class NavigationHomeComponent implements OnInit {
  errorMsg='';
  equipos=null;

  constructor(private _homeService: HomeServiceService,private router: Router) { 
    this.obtenerEquipoUsuario();
  }

  ngOnInit(): void {
  }

  obtenerEquipoUsuario(){
    this._homeService.obtenerEquiposUsuario()
    .subscribe(
      data => {(this.equipos = data),console.log(this.equipos)},
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
