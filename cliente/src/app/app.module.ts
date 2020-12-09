import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

//Enlazar back
import {HttpClientModule} from '@angular/common/http';

//Service
import {LoginService} from './services/loginService/login.service';
import { RegisterComponent } from './components/register/register.component';
import {FormsModule} from '@angular/forms';

//Para validación de formulario
import {ReactiveFormsModule} from '@angular/forms';
import {ConfirmEqualValidatorDirective} from './shared/confirm-equal-validator.directive';
import { HomeComponent } from './components/home/home.component';
import { NavigationHomeComponent } from './components/navigation-home/navigation-home.component';
import { FooterComponent } from './components/footer/footer.component';
import { TeamViewComponent } from './components/team-view/team-view.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { TaskAddComponent } from './components/task-add/task-add.component';
import { TaskModComponent } from './components/task-mod/task-mod.component';
import { EventAddComponent } from './components/event-add/event-add.component';
import { EventModComponent } from './components/event-mod/event-mod.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { AuthGuard } from './security/auth.guard';
import { AuthWelcome } from './security/auth.welcome';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CreateWorkTeamComponent } from './components/create-work-team/create-work-team.component';
import { BuscarUsuariosComponent } from './components/buscar-usuarios/buscar-usuarios.component';
import { UwuComponent } from './components/uwu/uwu.component';
import { VistaSolicitudesComponent } from './components/vista-solicitudes/vista-solicitudes.component';
import { AmigosComponent } from './components/amigos/amigos.component';
import { PasswordOlvidadaComponent } from './components/password-olvidada/password-olvidada.component';
import { CategoriaAddComponent } from './components/categoria-add/categoria-add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertAddMemberComponent } from './components/box/alert-add-member/alert-add-member.component';
import { AlertBanMemberComponent } from './components/box/alert-ban-member/alert-ban-member.component';
import { AlertAddTeamComponent } from './components/box/alert-add-team/alert-add-team.component';
import { AlertAddTaskComponent } from './components/box/alert-add-task/alert-add-task.component';
import { AlertAddEventComponent } from './components/box/alert-add-event/alert-add-event.component';
import { AlertModTaskComponent } from './components/box/alert-mod-task/alert-mod-task.component';
import { AlertModEventComponent } from './components/box/alert-mod-event/alert-mod-event.component';
import { ConfirmBanTeamComponent } from './components/box/confirm-ban-team/confirm-ban-team.component';
import { ConfirmBanMemberComponent } from './components/box/confirm-ban-member/confirm-ban-member.component';
import { ConfirmBanTaskComponent } from './components/box/confirm-ban-task/confirm-ban-task.component';
import { ConfirmBanEventComponent } from './components/box/confirm-ban-event/confirm-ban-event.component';
import { AlertBanEventComponent } from './components/box/alert-ban-event/alert-ban-event.component';
import { AlertBanTaskComponent } from './components/box/alert-ban-task/alert-ban-task.component';
import { AlertBanTeamComponent } from './components/box/alert-ban-team/alert-ban-team.component';
import { AlertMemberExistsComponent } from './components/box/alert-member-exists/alert-member-exists.component';
import { AlertTaskDoneComponent } from './components/box/alert-task-done/alert-task-done.component';
import { AlertTaskUndoneComponent } from './components/box/alert-task-undone/alert-task-undone.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    WelcomeComponent,
    RegisterComponent,
    ConfirmEqualValidatorDirective,
    HomeComponent,
    NavigationHomeComponent,
    FooterComponent,
    TeamViewComponent,
    TutorialComponent,
    TaskAddComponent,
    TaskModComponent,
    EventAddComponent,
    EventModComponent,
    ProfileComponent,
    MyProfileComponent,
    SidebarComponent,
    CreateWorkTeamComponent,
    BuscarUsuariosComponent,
    UwuComponent,
    VistaSolicitudesComponent,
    AmigosComponent,
    PasswordOlvidadaComponent,
    CategoriaAddComponent,
    AlertAddMemberComponent,
    AlertBanMemberComponent,
    AlertAddTeamComponent,
    AlertAddTaskComponent,
    AlertAddEventComponent,
    AlertModTaskComponent,
    AlertModEventComponent,
    ConfirmBanTeamComponent,
    ConfirmBanMemberComponent,
    ConfirmBanTaskComponent,
    ConfirmBanEventComponent,
    AlertBanEventComponent,
    AlertBanTaskComponent,
    AlertBanTeamComponent,
    AlertMemberExistsComponent,
    AlertTaskDoneComponent,
    AlertTaskUndoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    YouTubePlayerModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxMaterialTimepickerModule
  ],
  providers: [
    LoginService,
    AuthGuard,
    AuthWelcome
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
