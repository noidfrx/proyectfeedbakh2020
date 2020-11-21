import { Component, OnInit } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import {ProfileService} from '../../services/profileService/profile.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  datos: any = [];
  errorMsg='';
  amigoId;

  constructor( private route:ActivatedRoute, private ProfileService: ProfileService) { }
 
  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this. amigoId = params.get('id');
    })
    this.ProfileService.datosAmigo(this.amigoId).subscribe(
      data => { 
        this.datos = data;
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("no se pueden obtener los datos")
      }
    )


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
