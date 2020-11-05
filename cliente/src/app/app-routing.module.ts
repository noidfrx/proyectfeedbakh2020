import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';

//Importamos componentes de archivo login
import {LoginComponent} from './components/login/login.component';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {TeamViewComponent} from './components/team-view/team-view.component';
import {TaskMakerComponent} from './components/task-maker/task-maker.component';
import {EventMakerComponent} from './components/event-maker/event-maker.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';

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
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'teamview',
    component: TeamViewComponent
  },
  {
    path:'taskmaker',
    component: TaskMakerComponent
  },
  {
    path:'eventmaker',
    component: EventMakerComponent
  },
  {
    path:'tutorial',
    component: TutorialComponent
  }

];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
