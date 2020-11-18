import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../services/profileService/profile.service';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  datos: any;
  errorMsg='';
  constructor( private ProfileService: ProfileService) { }

  ngOnInit() {
    this.ProfileService.datosUsuario().subscribe(
      res => { console.log(res);
        this.datos = res;
        console.log(this.datos[0].email);
      },
      err => {
        this.errorMsg=err.statusText;
        console.log("no se pueden obtener los datos")
      }
    
    );

    this.ProfileService.amigos(
      /*res => { console.log(res);
        this.datos = res;
        console.log(this.datos[0].email);
      },
      err => {
        this.errorMsg=err.statusText;
        console.log("no se pueden obtener los datos")
      }*/
    
    );

    
  }
}