import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { YouTubePlayerModule } from "@angular/youtube-player";

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
//import { TaskMakerComponent } from './components/task-maker/task-maker.component';
//import { EventMakerComponent } from './components/event-maker/event-maker.component';
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
    //TaskMakerComponent,
    //EventMakerComponent,
    TutorialComponent,
    TaskAddComponent,
    TaskModComponent,
    EventAddComponent,
    EventModComponent,
    ProfileComponent,
    MyProfileComponent,
    SidebarComponent,
    CreateWorkTeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    YouTubePlayerModule
  ],
  providers: [
    LoginService,
    AuthGuard,
    AuthWelcome
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
