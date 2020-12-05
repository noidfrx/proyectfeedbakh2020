import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profileService/profile.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  errorMsg: any;
  notifiacion: any;
  mostrarNot: boolean;

  constructor(private consulta:ProfileService) { }

  ngOnInit(): void {
    this.consulta.obtenerSolicitudes().subscribe(
      res => {
        console.log('datos que recibo',res);
        this.notifiacion=res;
        // llama a la función que mostrar, que como indica, decide qué opciones mostrará
        this.queMostrar();
      },
      err => {
        this.errorMsg=err.statusText;
        console.log("no se pueden obtener los datos");
      });
  }
  queMostrar(){
    if(this.notifiacion.length==0){
      this.mostrarNot=false;
      console.log("mostrar campana 1");
    }else{
      this.mostrarNot=true;
      console.log("mostrar campana 2");
    }
  }

}
