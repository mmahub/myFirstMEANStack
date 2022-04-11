import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./user/login/login.component";
import { SignupComponent } from "./user/signup/signup.component";
import { ListTaskComponent } from "./task/list-task/list-task.component";
import { AddTaskComponent } from "./task/add-task/add-task.component";
import { UpdateTaskComponent } from "./task/update-task/update-task.component";
import { DeleteTaskComponent } from "./task/delete-task/delete-task.component";
import { PageNotFoundComponent } from "../app/shared/page-not-found/page-not-found.component";
import { WelcomePageComponent } from "../app/shared/welcome-page/welcome-page.component";
import { AuthGuard } from "./auth.guard";


const routes: Routes = [
  {
    path: '',
    // component: WelcomePageComponent,
    redirectTo: '/welcome',       //this will redirect the empty path to /welcome page.
    pathMatch: 'full'             // this will make sure that wen url is fully empty then only it will work.
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'tasklist',
    component: ListTaskComponent,
    canActivate: [AuthGuard]      //this means for access of this route login is required
  },
  {
    path: 'addtask',
    component: AddTaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'updatetask/:id',
    component: UpdateTaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'deletetask/:id',
    component: DeleteTaskComponent
  },
  {
    path: 'welcome',
    component: WelcomePageComponent
  },
  {
    path: '**',     //this called as wildcard route, this will get redirect if non of the above route will match.
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
