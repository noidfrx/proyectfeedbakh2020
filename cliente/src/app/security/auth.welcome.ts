import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ComprobarIngresoService } from '../services/comprobarIngresoService/comprobar-ingreso.service';

@Injectable()
export class AuthWelcome implements CanActivate{

    constructor(private _comprobarIngresoService:ComprobarIngresoService, private router: Router){

    }
    
    //Método para activar un componente o no
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        this._comprobarIngresoService.comprobarIngreso().subscribe(
            (data)=>{
                this.router.navigate(['/home']);
                return false;
            },
            (error)=>{
                return true;
            }
        );
        return true;
    }

}