import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uwu',
  templateUrl: './uwu.component.html',
  styleUrls: ['./uwu.component.css']
})
export class UwuComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.router.navigate(['/teamview']);
  }

}
