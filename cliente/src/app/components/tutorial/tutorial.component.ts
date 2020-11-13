import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/loginService/login.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {

  errorMsg='';
  tutorialVisto=0;

  constructor(private _loginService: LoginService) { 
    this.tutorialCompletado();
  }

  ngOnInit(): void {
    const tag=document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }

  tutorialCompletado(){
    this._loginService.tutorialCompletado()
    .subscribe(
      data => {
        this.tutorialVisto=data.visto;
      },
      error => {
        this.errorMsg=error.statusText;
        console.log("Error con el tutorial");
      }
    )
  }

}
