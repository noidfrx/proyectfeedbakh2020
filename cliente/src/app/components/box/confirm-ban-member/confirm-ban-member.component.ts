import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-ban-member',
  templateUrl: './confirm-ban-member.component.html',
  styleUrls: ['./confirm-ban-member.component.css']
})
export class ConfirmBanMemberComponent implements OnInit {

  constructor(public dialog: MatDialogRef<ConfirmBanMemberComponent>,
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
