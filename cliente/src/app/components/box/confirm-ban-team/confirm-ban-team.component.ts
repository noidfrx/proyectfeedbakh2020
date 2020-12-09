import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-ban-team',
  templateUrl: './confirm-ban-team.component.html',
  styleUrls: ['./confirm-ban-team.component.css']
})
export class ConfirmBanTeamComponent implements OnInit {

  constructor(public dialog: MatDialogRef<ConfirmBanTeamComponent>,
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
