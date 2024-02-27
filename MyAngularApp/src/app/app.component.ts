import { Component, OnInit } from '@angular/core';
import { NotificationsService } from "angular2-notifications";

import { UserService } from "./shared/user.service";
import { LoginComponent } from "./user/login/login.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  { 
  title = 'AngularApp';

  constructor(private userService: UserService) { }

}
