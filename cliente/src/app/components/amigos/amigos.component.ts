import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/Profile';
import { ProfileService } from 'src/app/services/profileService/profile.service';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.component.html',
  styleUrls: ['./amigos.component.css']
})
export class AmigosComponent implements OnInit {

  constructor(private buscar:ProfileService) { }
  errorMsg: string;
  mostrar:number=0;
  amigos: any[];
  ngOnInit(): void {
    this.buscar.amigos().subscribe(
      res => { console.log(res);
        this.amigos= res;
        console.log("los datos", this.amigos);
      },
      err => {
        this.errorMsg=err.statusText;
      }
    );
  }
  
}
