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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,private cookieService: CookieService , private _route:ActivatedRoute,private router:Router,private userHttp:UserHttpService,private gaurd:RouteGuardService) { }


  public email : string;
  public password : string;
  public registerFlag:boolean;
  public firstName:string;
  public lastName:string;
  public phoneNumber:number;
  public inputEmail:string;
  public inputPassword:string;

  public mainError;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber:['',[Validators.required, Validators.pattern('[6789][0-9]{9}')]]
  });
  
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
  
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      
        return;
    }
    this.userCreation()
    
  }

  public userCreation(): any {
    let newUser={
      firstName:this.firstName,
      lastName:this.lastName,
      mobileNumber:this.phoneNumber,
      email:this.inputEmail,
      password:this.inputPassword
    }

    
    this.userHttp.userCreation(newUser).subscribe(   
    )
    setTimeout(()=>{
      this.router.navigate(['/login'])
    },1000)
  }

  
  }

