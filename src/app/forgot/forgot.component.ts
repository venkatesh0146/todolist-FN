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

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;


  constructor(private formBuilder: FormBuilder,private cookieService: CookieService , private _route:ActivatedRoute,private router:Router,private userHttp:UserHttpService,private gaurd:RouteGuardService) { }
  public email : string;

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
  });
  }
  get f() { return this.registerForm.controls; }
  public mainError;
  public currentUserId;

  public forgot(): any {
    let userData = {
      email: this.email,
    }
    
    this.userHttp.forgot(userData).subscribe(
      data =>{
        if(data.error){
         
          return;
        }
      
        
        this.router.navigate(['/login']);
  
      },
      error =>{
    
        if(error instanceof HttpErrorResponse){
          this.mainError=error.error.message;
        }
      }
    )
  }

  onSubmit() {
 
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      
        return;
    }

    this.forgot()
  }
}
