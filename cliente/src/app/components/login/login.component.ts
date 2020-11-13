import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/Login';
import { LoginService } from '../../services/loginService/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  errorMsg = ''; //Si es vacío no hay error c:

  constructor(private _loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  loginModel = new Login('', '');
  ingresado = false;

  //Creada
  onSubmit() {
    //Pasamos lo que nos entrega el usuario a método del service
    this.ingresado = true;
    
    this._loginService.ingresar(this.loginModel).subscribe(
      //Si me devuelve okay
      //data => this.router.navigateByUrl('/home'),
      (data) => {
        //La sesión ha sido iniciada correctamente redirige al HOME
        if(data.tutorial == 0){
          this.router.navigateByUrl('/tutorial');
        }else{
          this.router.navigateByUrl('/home');
        }
      },
      (error) => {
        this.errorMsg = error.statusText;
        console.log('Error, no se recibe data');
      }
    );
  }
}
