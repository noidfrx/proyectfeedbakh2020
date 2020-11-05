import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { TaskMakerComponent } from './components/task-maker/task-maker.component';
import { EventMakerComponent } from './components/event-maker/event-maker.component';

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
    TaskMakerComponent,
    EventMakerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
