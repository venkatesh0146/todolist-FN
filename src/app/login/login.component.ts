import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {ActivatedRoute, Router} from '@angular/router'
import { timeout } from 'q';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserHttpService } from '../user-http.service';
import { Observable } from 'rxjs';
import {RouteGuardService} from '../route-guard.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  
  registerForm: FormGroup;
  submitted = false;

 

  constructor(private toastr: ToastrService,private formBuilder: FormBuilder,private cookieService: CookieService , private _route:ActivatedRoute,private router:Router,private userHttp:UserHttpService,private gaurd:RouteGuardService) {
    cookieService.delete('authToken');
      this.toastr.success('-made by venkatesh','Todo application welcomes you!!!' );
    
   }
  public email : string;
  public password : string;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }
  get f() { return this.registerForm.controls; }
public mainError;
public currentUserId;


public userSignIn(): any {
  let userData = {
    email: this.email,
    password : this.password
  }

  this.userHttp.userSignIn(userData).subscribe(
    data =>{
   
      this.cookieService.set( 'authToken', data.data.authToken);
      this.cookieService.set( 'user', JSON.stringify(data.data.userDetails));


    
      
      this.router.navigate(['/home']);

    },
    error =>{
     
      if(error instanceof HttpErrorResponse){
        this.mainError=error.error.message;
      }
    }
  )
}
public forgot(): any {
  this.router.navigate(['/forgot'])
}
public register(): any {
  this.router.navigate(['/register'])

}

onSubmit() {
 
  this.submitted = true;
  
  // stop here if form is invalid
  if (this.registerForm.invalid) {
    
      return;
  }
 
  this.userSignIn()
}

}
