import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

import { UserService } from 'src/app/shared/user.service';
import { getTokenSourceMapRange } from 'typescript';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userservice:UserService, 
              private formBuilder:FormBuilder,
              private router: Router) { }

  loginForm;
  submitted:boolean = false ;
  invalidEmailPassword: boolean ;
  token: any;
  username: any;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),     // , Validators.email
      password: new FormControl('', [Validators.required]),   // , Validators.minLength(4)
    });
  }

  // convenience getter for easy access to form fields
  get l() { return this.loginForm.controls ; }

  getData(){

    //need this variable to use in validation
    this.submitted = true ;

    if(this.loginForm.valid){
      this.userservice.loginUser(this.loginForm.value).subscribe(
        (result) => {
          console.warn(result);
          this.token= result.token  ;
          this.username = result.name;
          console.log(`Logging JWt Token: ${this.token}`);
          console.log(`Logging Username: ${result.name}`);
          localStorage.setItem('token', this.token);
          localStorage.setItem('Username', result.name);
          this.router.navigate(['/tasklist']);
          // return
        },
        (error) => {
          //printing error status
          console.warn(error.status);

          //printing error value
          console.warn(error.error);

          if (error.status == 400) {
            this.invalidEmailPassword = true
            setTimeout(() => this.invalidEmailPassword = false, 5000);
          }
          // return
        }
      );
    }
    else{
      console.warn('Form is invalid');
      return
    }

  }
}
