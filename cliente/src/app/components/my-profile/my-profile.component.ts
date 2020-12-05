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
  amigos: any;
  modoEdicion=true;
  constructor( private ProfileService: ProfileService) { }

  ngOnInit() {
    this.ProfileService.datosUsuario().subscribe(
      res => { console.log(res);
        this.datos = res;
      },
      err => {
        this.errorMsg=err.statusText;
      }
    
    );

    this.ProfileService.amigos().subscribe(
      res => { console.log(res);
        this.amigos = res;
      },
      err => {
        this.errorMsg=err.statusText;
      }
    );

    
  }
}