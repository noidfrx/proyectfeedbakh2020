import { Component, OnInit } from '@angular/core';
import {Register} from '../../models/Register';
import {RegisterService} from '../../services/registerService/register.service';

//Para validación de formulario
import {FormControl,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMsg='';

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
      data => console.log("Data registro correcta!", data),
      error => this.errorMsg = error.statusText
      // Manejo de errores ^
    )
  }

}
