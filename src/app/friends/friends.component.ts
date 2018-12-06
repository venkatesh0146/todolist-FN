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
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  public userList:any;
  public user1;
  public friendRequestIds = [];
  public friendsList =[];
  public arr = [];
  public arr1 = [];
  public friendRequestData =[];
  public friendsListData = [];
  constructor(private toastr: ToastrService,private cookieService: CookieService,private formBuilder: FormBuilder,private _route:ActivatedRoute,private router:Router,private userHttp:UserHttpService,private gaurd:RouteGuardService) {
   
    this.user1=  JSON.parse(this.cookieService.get('user'))
  
   
   }

  ngOnInit() {
    this.getAllUsers();
   
    
  }
  ngAfterContentChecked(){
    
  }
 getAllUsers(){
   this.userHttp.getAllUsers().subscribe(
     data =>{
      this.userList = data.data;
      this.getFriendRequests()
      this.getFriendList()
     },
     error =>{

     }
   )

 }
 onsubmit(data){
  let options = {
    from :this.user1.userId,
    to :data
  }

  this.userHttp.sendFriendRequest(options).subscribe(
    data =>{
      this.toastr.info(" Friend Request sent!!" );
    },
    error =>{
    }
  )
 }

 onsubmit1(data){
  let options = {
    userId :this.user1.userId,
    friendRequestId :data
  }
  this.userHttp.acceptFriendRequest(options).subscribe(
    data =>{
      this.toastr.info(" Friend Request Accepted!!", this.user1.firstName+''+'is now became your friend' );
      this.ngOnInit();
    },
    error =>{
    }
  )
 }
 onsubmit2(data){
  let options = {
    userId :this.user1.userId,
    friendRequestId :data
  }
  this.userHttp.rejectFriendRequest(options).subscribe(
    data =>{
      this.toastr.info(" Friend Request rejected!!" );
      this.ngOnInit();
    },
    error =>{
    }
  )
 }

 getFriendRequests(){
 for(let user of this.userList){
   if(user.userId==this.user1.userId){
     for(let friendReq of user.friendRequest){
     this.arr.push(friendReq)
    
     }
   }
 }
 let x = (names) => names.filter((v,i) => names.indexOf(v) === i)
 
 this.friendRequestIds=x(this.arr)

 for(let friendreq of this.friendRequestIds){
  
   this.userHttp.getSingleUser(friendreq).subscribe(
     data =>{
       let local = data['data']
       this.friendRequestData.push(local)
     },
     error =>{

     }
   )
 
 }

 }

 getFriendList(){
  for(let user of this.userList){
    if(user.userId==this.user1.userId){
      for(let friendList of user.friendsList){
      this.arr1.push(friendList)

     
      }
    }
  }
 
 
  for(let friendreq of this.arr1){

    this.userHttp.getSingleUser(friendreq).subscribe(
      data =>{
        let local = data['data']
        this.friendsListData.push(local)
      },
      error =>{
 
      }
    )
  
  }

 
  }


}
 