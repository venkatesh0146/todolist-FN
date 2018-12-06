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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
public user;
registerForm: FormGroup;
  submitted = false;
  public title;
  public todoLists

  constructor(private toastr: ToastrService,private cookieService: CookieService,private formBuilder: FormBuilder,private _route:ActivatedRoute,private router:Router,private userHttp:UserHttpService,private gaurd:RouteGuardService) { 
    this.user=  JSON.parse(this.cookieService.get('user'))
  
  }

  ngOnInit() {
  
  
   this.registerForm = this.formBuilder.group({
    title: ['', Validators.required]
});
this.getTodoList();
  }
  public todoListSubmit(): any {
    let userData = {
      name: this.title,
      userId : this.user.userId
    }
    this.userHttp.newTodoList(userData).subscribe(
      data =>{
        this.toastr.info('Hi'+ ' '+userData.name+" "+ 'Posted SuccessFully!!' );
        this.ngOnInit();
      },
      error =>{
       
        
        }
    )
  }

   public getTodoList(): any {

    let userData = this.user.userId;
    this.userHttp.todoList(userData).subscribe(
      data =>{
        this.todoLists= data;
      },
      error =>{
       
        
        }
    )
  }
  onSubmit() {
    this.todoListSubmit();
   
   document.getElementById("close").click();
   this.ngOnInit()
  }
  

}
