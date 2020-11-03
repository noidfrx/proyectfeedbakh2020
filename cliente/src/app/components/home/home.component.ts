import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  idIngresado:any;
  nombreIngresado:any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.idIngresado=history.state.id;
    this.nombreIngresado=history.state.nombre;

    console.log(this.idIngresado+" "+this.nombreIngresado);
  }

  inicio(){
    this.router.navigateByUrl('/welcome');

  }

}
