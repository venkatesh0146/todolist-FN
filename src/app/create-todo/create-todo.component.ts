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
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {

  public user;

  public title;
  public todoLists;
 public todoId1
 public mainTasks;
  constructor(private toastr: ToastrService,private cookieService: CookieService,private formBuilder: FormBuilder,private _route:ActivatedRoute,private router:Router,private userHttp:UserHttpService,private gaurd:RouteGuardService) { }
 
  ngOnInit() {
    this.user=  JSON.parse(this.cookieService.get('user'))
    this.getTodoList();
    this.todoId1=  this._route.snapshot.paramMap.get('todoID');
    this.todoLists.sort((a,b) => {
      return a.status - b.status;
    })
  }
  
  public getTodoList(): any {

    let userData = this.user.userId;
    this.userHttp.todoList(userData).subscribe(
      data =>{
        data.sort((a,b) => {
          return a.status - b.status;
        })
        for(let data1 of data){
          if(data1.todoId===this.todoId1){
            this.todoLists=data1.tasks
          }
        }

      },
      error =>{
       
        
        }
    )

  }
  onAdd(itemTitle){
    var options ={
      task: itemTitle.value,
      status:false
    }
    this.userHttp.addTask(options,this.todoId1).subscribe(
      data =>{
        this.toastr.info(" New Task Posted SuccessFully!!" );
        this.ngOnInit();
        itemTitle.value = null;
      },
      error =>{

      }
    )
  }
  alterCheck(id,status) {
    var data1 = {
      id:id,
      status:!status
      
    }
 
   this.userHttp.checkOrUnCheckTitle(data1).subscribe(
     data =>{
       if(data1.status){
        this.toastr.info(" Task completed SuccessFully!!" );
       }
      else{
        this.toastr.warning(" Task Marked as not completed !! " );
      }
      this.ngOnInit()
     },
     error=>{
      
     }

   )
  }
  onDelete(id){
    var data = {
      id:id,
      
    }
    this.userHttp.deleteTask(data).subscribe(
      data =>{
        this.toastr.error(" Task  Deleted SuccessFully!!" );
        this.ngOnInit()
      },
      error =>{

      }
    )

  }
 
}
