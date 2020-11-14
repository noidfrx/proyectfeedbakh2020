import { Component, OnInit } from '@angular/core';
import { ComprobarIngresoService } from '../../services/comprobarIngresoService/comprobar-ingreso.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router, private _comprobarIngresoService: ComprobarIngresoService) { 
    // this.comprobarIngreso();


  }

  ngOnInit(): void {
  }


  // comprobarIngreso() {
  //   this._comprobarIngresoService.comprobarIngreso().subscribe(
  //     //Si me devuelve data
  //     (data) => {
  //       //La sesión ha sido iniciada correctamente redirige al HOME
  //       console.log('Hay usuario');
  //       this.router.navigate(['/home']);
  //     },
  //     (error) => {
  //       console.log('No hay usuario ingresado');
  //     }
  //   );
  // }

}
