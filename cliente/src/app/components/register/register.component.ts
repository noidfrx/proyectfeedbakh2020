import { Component, OnInit } from '@angular/core';
import {Register} from '../../models/Register';
import {RegisterService} from '../../services/registerService/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _registerService:RegisterService) { }

  ngOnInit(): void {
  }

  //PARA TESTING
  //registerModel = new Register('Eduardo','Ibacache','González','eduardo@gmail.com','123','123');
  registerModel = new Register('','','','','','');
  registrado=false;
  
  onSubmit(){
    this.registrado=true;
    this._registerService.registrar(this.registerModel)
    .subscribe(
      data => console.log("Data correcta!", data),
      error => console.error("Error :c", error)
    )
  }

}
