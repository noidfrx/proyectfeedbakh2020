import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/Login';

@Component({
  selector: 'app-password-olvidada',
  templateUrl: './password-olvidada.component.html',
  styleUrls: ['./password-olvidada.component.css']
})
export class PasswordOlvidadaComponent implements OnInit {
  enviada="";
  constructor() { }
  loginModel = new Login('', '');

  ngOnInit(): void {
  }
  onSubmit() {
    this.enviada="correoEnviado";
  }

}
