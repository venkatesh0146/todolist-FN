import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {RequestOptions, Request, RequestMethod, Http} from '@angular/http';
import {CanActivate,ActivatedRouteSnapshot,Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  private baseUrl = 'http://api.venky146.online/api/v1';

  constructor(private _http: HttpClient, private cookieService: CookieService,private http:Http) { }

  value= this.cookieService.get('authToken');
  userId = this.cookieService.get('userId');

  userCreation(userData): any {

    let myResponse = this._http.post(this.baseUrl + '/users' + '/signup', userData)
    return myResponse;
  
  }

  userSignIn(userData):any{
    let myResponse = this._http.post(this.baseUrl + '/users' + '/login', userData)
    return myResponse;
    
  }

  newTodoList(userData):any{
    let myResponse = this._http.post(this.baseUrl + '/users' + '/todo', userData)
    return myResponse;
    
  }

  newMultiTodoList(userData):any{
    let myResponse = this._http.post(this.baseUrl + '/users' + '/multitodo', userData)
    return myResponse;
    
  }

  forgot(userData):any{
    let myResponse = this._http.post(this.baseUrl + '/users' + '/forgot', userData)
    return myResponse;
    
  }

  todoList(userData):any{
    let myResponse = this._http.get(this.baseUrl + '/users' + '/'+userData+'/todolist' )
    return myResponse;
    
  }


  getMultiTodoList(userData):any{
    let myResponse = this._http.get(this.baseUrl + '/users' + '/'+userData+'/multitodolist' )
    return myResponse;
    
  }

  getMultiTodoListTasks(userData):any{
    let myResponse = this._http.get(this.baseUrl + '/users' + '/'+userData+'/multitodolisttasks' )
    return myResponse;
    
  }

logout(userdata){
 
  let myResponse = this._http.post(this.baseUrl + '/users' + '/logout',userdata )
  return myResponse;
}


  reset(userData):any{
    let myResponse = this._http.post(this.baseUrl + '/users' + '/reset', userData)
    return myResponse;
    
  }
  addTask(userData,taskId){
    let myResponse = this._http.put(this.baseUrl + '/users' + '/' +taskId +'/edit', userData)
    return myResponse;
  }

  addMultiTask(userData,taskId){
    let myResponse = this._http.put(this.baseUrl + '/users' + '/' +taskId +'/multiedit', userData)
    return myResponse;
  }
  checkOrUnCheckTitle(userData){
    let myResponse = this._http.put(this.baseUrl+ '/users'+'/alterCheck',userData);
    return myResponse
  }

  checkOrUnCheckMultiTitle(userData){
    let myResponse = this._http.put(this.baseUrl+ '/users'+'/altermultiCheck',userData);
    return myResponse
  }
  deleteTask(userData){
   
    let myResponse = this._http.post(this.baseUrl+'/users'+'/deletetask',userData)
    return myResponse;
  }


  deleteMultiTask(userData){
   
    let myResponse = this._http.post(this.baseUrl+'/users'+'/deletemultitask',userData)
    return myResponse;
  }


  getAllUsers():any{
    let myResponse = this._http.get(this.baseUrl + '/users' + '/view'+'/all' )
    return myResponse;
  }

  getSingleUser(user){
    let myResponse = this._http.get(this.baseUrl + '/users' + '/'+user )
    return myResponse;
  }
  sendFriendRequest(userData){
    let myResponse = this._http.post(this.baseUrl + '/users' + '/sendfriendrequest',userData )
    return myResponse;
  }

  acceptFriendRequest(userData){
   
      let myResponse = this._http.post(this.baseUrl + '/users' + '/acceptfriendrequest',userData )
      return myResponse;
    
  }

    rejectFriendRequest(userData){
   
      let myResponse = this._http.post(this.baseUrl + '/users' + '/rejectfriendrequest',userData )
      return myResponse;
    
  }
}
