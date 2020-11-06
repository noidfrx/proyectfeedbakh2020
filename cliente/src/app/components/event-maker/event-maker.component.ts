import { Component, OnInit } from '@angular/core';
import {Event} from '../../models/Event';
import {EventMakerService} from '../../services/eventmakerService/eventmaker.service';

//Para validación de formulario
import {FormControl,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-event-maker',
  templateUrl: './event-maker.component.html',
  styleUrls: ['./event-maker.component.css']
})
export class EventMakerComponent implements OnInit {
  errorMsg='';

  constructor(private _eventmakerService:EventMakerService) { }

  ngOnInit(): void {
  }

  eventModel = new Event('','',null,null,null,true,null,null,true,'',true,[],null,'','');

  /*
  onSubmit(){
    this._eventmakerService.addTask(this.taskModel)
    .subscribe(
      data => console.log("Tarea agregada!", data),
      error => this.errorMsg = error.statusText
      // Manejo de errores ^
    )
  }
  */

}
