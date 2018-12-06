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
import { Token } from '@angular/compiler';
@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private cookieService: CookieService , private _route:ActivatedRoute,private router:Router,private userHttp:UserHttpService,private gaurd:RouteGuardService) { }
  public password : string;
  public confirm : string;
  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
  });

  }
  get f() { return this.registerForm.controls; }
  public mainError;
  public currentUserId;

  public reset(): any {

    let token =this._route.snapshot.paramMap.get('token')
    let userData = {
      password: this.password,
      confirm : this.confirm,
      token : token
    }
    
    
    this.userHttp.reset(userData).subscribe(
      data =>{
        if(data.error){
        
          return;
        }
      
        
        this.router.navigate(['/login']);
  
      },
      error =>{
       alert(error)
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

    this.reset()
  }
}
