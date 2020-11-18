import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../services/profileService/profile.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  datos: any = [];
  errorMsg='';
  constructor( private ProfileService: ProfileService) { }

  ngOnInit() {
    this.ProfileService.datosUsuario().subscribe(
      data => { console.log(data);
        this.datos = data.message;
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("no se pueden obtener los datos")
      }
    
    );

    
  }

}
