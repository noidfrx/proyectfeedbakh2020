import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/Login';
import { Router } from '@angular/router';
import {HomeServiceService} from '../../services/homeService/home-service.service';
import { Categoria } from 'src/app/models/Categoria';

@Component({
  selector: 'app-categoria-add',
  templateUrl: './categoria-add.component.html',
  styleUrls: ['./categoria-add.component.css']
})
export class CategoriaAddComponent implements OnInit {

  constructor(private _homeService:HomeServiceService,private router: Router) { }
  categoriaModel = new Categoria('');

  ngOnInit(): void {
  }

  onSubmit() {
    
    this._homeService.addCategoria(this.categoriaModel).subscribe(
      
      (data) => {
        this.router.navigateByUrl('/taskadd');
      },
      (error) => {
        console.log('Error, no se recibe data');
      }
    );
  }

}

