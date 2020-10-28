import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/Login';
import {LoginService} from '../../services/loginService/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _loginService:LoginService) { }

  ngOnInit(): void {
  }

  loginModel = new Login('','');
  ingresado = false;

  onSubmit(){
    //Pasamos lo que nos entrega el usuario a método del service
    this.ingresado=true;
    this._loginService.ingresar(this.loginModel)
      .subscribe(
        data => console.log('Data success!', data),
        error => console.error('Error :c', error)
      )
  }

}
