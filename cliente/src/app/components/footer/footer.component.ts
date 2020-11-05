import { Component, OnInit } from '@angular/core';
import {HomeServiceService} from '../../services/homeService/home-service.service'


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  nombreUsuario='';
  errorMsg='';

  constructor(private _homeService: HomeServiceService) {
    this.obtenerNombreUsuario();
  }

  ngOnInit(): void {
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
}
