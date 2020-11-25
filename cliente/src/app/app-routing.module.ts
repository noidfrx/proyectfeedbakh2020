import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';

//Importamos componentes de archivo login
import {LoginComponent} from './components/login/login.component';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {TeamViewComponent} from './components/team-view/team-view.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { TaskAddComponent } from './components/task-add/task-add.component';
import { TaskModComponent } from './components/task-mod/task-mod.component';
import { EventAddComponent } from './components/event-add/event-add.component';
import { EventModComponent } from './components/event-mod/event-mod.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { AuthGuard } from './security/auth.guard';
import { AuthWelcome } from './security/auth.welcome';
import { CreateWorkTeamComponent } from './components/create-work-team/create-work-team.component';
import { BuscarUsuariosComponent } from './components/buscar-usuarios/buscar-usuarios.component';
import { UwuComponent } from './components/uwu/uwu.component';

const routes: Routes = [

  //RUTA INICIAL
  {
    path:'',
    redirectTo:'/welcome',
    pathMatch: 'full' //Se usa porque ruta inicial redirecciona a otro lugar
  },
  {
    path:'welcome',
    component: WelcomeComponent,
    canActivate: [AuthWelcome]
    },
  {
    path:'login',
    component: LoginComponent,
    canActivate: [AuthWelcome]
  },
  {
    path:'register',
    component: RegisterComponent,
    canActivate: [AuthWelcome]
  },
  {
    path:'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'teamview',
    component: TeamViewComponent,
    canActivate: [AuthGuard]
    
  },
  {
    path:'taskadd',
    component: TaskAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'taskmod',
    component: TaskModComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'eventadd',
    component: EventAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'eventmod',
    component: EventModComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'perfiles/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'my-profile',
    component: MyProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'tutorial',
    component: TutorialComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'crearEquipo',
    component: CreateWorkTeamComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'buscarUsuario',
    component: BuscarUsuariosComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'uwu',
    component: UwuComponent,
    canActivate: [AuthGuard]
  }

];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
