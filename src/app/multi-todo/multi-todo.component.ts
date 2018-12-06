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
  selector: 'app-multi-todo',
  templateUrl: './multi-todo.component.html',
  styleUrls: ['./multi-todo.component.css']
})
export class MultiTodoComponent implements OnInit {
  private sub;
  public user;
  registerForm: FormGroup;
    submitted = false;
    public title;
    public todoLists;
    public todoListsOfFriends  = [];
  
    constructor(private toastr: ToastrService,private cookieService: CookieService,private formBuilder: FormBuilder,private _route:ActivatedRoute,private router:Router,private userHttp:UserHttpService,private gaurd:RouteGuardService) { }
  
    ngOnInit() {
    
     this.user=  JSON.parse(this.cookieService.get('user'))  
     this.registerForm = this.formBuilder.group({
      title: ['', Validators.required]
  });
  this.getTodoList();
  this.getTodoListOfFriends();
    }
    public todoListSubmit(): any {
      let userData = {
        name: this.title,
        userId : this.user.userId
      }
      this.userHttp.newMultiTodoList(userData).subscribe(
        data =>{
          this.toastr.info('Hi'+ ' '+userData.name+" "+ 'Posted SuccessFully!!' );
          this.getTodoList();
          this.getTodoListOfFriends();
        },
        error =>{
         
          
          }
      )
    }
 
     public getTodoList(): any {
  
      let userData = this.user.userId;

      this.userHttp.getMultiTodoList(userData).subscribe(
        data =>{
          

          this.todoLists= data;
        },
        error =>{
         
          
          }
      )
    }
    public getTodoListOfFriends(){
      for(let friends of this.user.friendsList){
        this.userHttp.getMultiTodoList(friends).subscribe(
          data =>{
            

            this.todoListsOfFriends =data
 
          },
          error =>{
           
            
            }
        )
      }
    }
    onSubmit() {
      this.todoListSubmit();
     document.getElementById("close").click();
     this.ngOnInit()
    }
    
  
  }
