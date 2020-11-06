import { Component, OnInit } from '@angular/core';
import {Task} from '../../models/Task';
import {TaskMakerService} from '../../services/taskmakerService/taskmaker.service';

//Para validación de formulario
import {FormControl,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-task-maker',
  templateUrl: './task-maker.component.html',
  styleUrls: ['./task-maker.component.css']
})
export class TaskMakerComponent implements OnInit {
  errorMsg='';

  constructor(private _taskmakerService:TaskMakerService) { }

  ngOnInit(): void {
  }

  taskModel = new Task('','',null,null,null,true,'',true,'');

  onSubmit(){
    this._taskmakerService.addTask(this.taskModel)
    .subscribe(
      data => console.log("Tarea agregada!", data),
      error => this.errorMsg = error.statusText
      // Manejo de errores ^
    )
  }

}
