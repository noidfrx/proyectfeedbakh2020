import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-ban-task',
  templateUrl: './confirm-ban-task.component.html',
  styleUrls: ['./confirm-ban-task.component.css']
})
export class ConfirmBanTaskComponent implements OnInit {

  constructor(public dialog: MatDialogRef<ConfirmBanTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  yes(){
    this.dialog.close(true);
  }

  no(){
    this.dialog.close(false);
  }

}
