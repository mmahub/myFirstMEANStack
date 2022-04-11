import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
// import { HttpErrorInterceptor } from './http-error.interceptor';
import { SimpleNotificationsModule } from "angular2-notifications";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from "./user//user.module";
import { TaskModule } from "./task/task.module";
import { AuthGuard } from "./auth.guard";
import { UserService } from "src/app/shared/user.service";
import { TokenInterceptor } from "src/app/shared/token-interceptor";
import { LoginComponent } from "./user/login/login.component";
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { WelcomePageComponent } from './shared/welcome-page/welcome-page.component';




@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    WelcomePageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // need to import new module here Everytime whenever you add a new module in angular_Project
    UserModule,
    TaskModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    UserService, 
    AuthGuard,
    LoginComponent,

    //this is little different from normal provider we are passing objects here.
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
