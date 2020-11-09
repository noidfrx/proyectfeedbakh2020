import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';

//Importamos componentes de archivo login
import {LoginComponent} from './components/login/login.component';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {TeamViewComponent} from './components/team-view/team-view.component';
//import {TaskMakerComponent} from './components/task-maker/task-maker.component';
//import {EventMakerComponent} from './components/event-maker/event-maker.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { TaskAddComponent } from './components/task-add/task-add.component';
import { TaskModComponent } from './components/task-mod/task-mod.component';
import { EventAddComponent } from './components/event-add/event-add.component';
import { EventModComponent } from './components/event-mod/event-mod.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';

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
  /*{
    path:'taskmaker',
    component: TaskMakerComponent
  },*/
  {
    path:'taskadd',
    component: TaskAddComponent
  },
  {
    path:'taskmod',
    component: TaskModComponent
  },
  /*{
    path:'eventmaker',
    component: EventMakerComponent
  },*/
  {
    path:'eventadd',
    component: EventAddComponent
  },
  {
    path:'eventmod',
    component: EventModComponent
  },
  {
    path:'profile',
    component: ProfileComponent
  },
  {
    path:'my-profile',
    component: MyProfileComponent
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
