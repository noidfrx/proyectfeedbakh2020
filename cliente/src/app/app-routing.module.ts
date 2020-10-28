import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';

//Importamos componentes de archivo login
import {LoginComponent} from './components/login/login.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {RegisterComponent} from './components/register/register.component';

const routes: Routes = [

  //RUTA INICIAL
  {
    path:'',
    redirectTo:'/welcome',
    pathMatch: 'full' //Se usa porque ruta inicial redirecciona a otro lugar
  },
  {
    path:'welcome',
    component: WelcomeComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  }

];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
