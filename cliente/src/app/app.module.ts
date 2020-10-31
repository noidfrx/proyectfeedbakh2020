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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    WelcomeComponent,
    RegisterComponent,
    ConfirmEqualValidatorDirective

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
