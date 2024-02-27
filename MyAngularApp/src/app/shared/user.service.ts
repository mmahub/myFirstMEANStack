import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

// import { LoginComponent } from "src/app/user/login/login.component";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL = 'http://localhost:3000/users'
  loginURL = 'http://localhost:3000/login'

  constructor(private http: HttpClient,
              private router: Router) 
  { }   //private logincompo: LoginComponent

  
  // for user signup/registration
  saveUser(data){
    return this.http.post<any>(this.baseURL, data)
  }

  // for user login
  loginUser(user){
    return this.http.post<any>(this.loginURL, user)
  }

  loggedIn(){

    //in below line code '!!' (called double negation) is used because it will always return boolean value true and false
    return !!localStorage.getItem('token');
  }

  logoutUser(){
    
    // localStorage.clear()
    localStorage.removeItem('token')
    localStorage.removeItem('Username')
    this.router.navigate(['/login'])
  }

  getToken(){
    return localStorage.getItem('token') ;
  }

  getUsername(){
    return localStorage.getItem('Username') ;
  }
}
