import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-ban-event',
  templateUrl: './confirm-ban-event.component.html',
  styleUrls: ['./confirm-ban-event.component.css']
})
export class ConfirmBanEventComponent implements OnInit {

  constructor(public dialog: MatDialogRef<ConfirmBanEventComponent>,
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
