import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {RouterModule,Routes} from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import {UserHttpService} from './user-http.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs'
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import {RouteGuardService} from './route-guard.service';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FriendsComponent } from './friends/friends.component';
import { MultiTodoComponent } from './multi-todo/multi-todo.component';
import { CreateMultiTodoComponent } from './create-multi-todo/create-multi-todo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ForgotComponent,
    ResetComponent,
    CreateTodoComponent,
    NavbarComponent,
    FriendsComponent,
    MultiTodoComponent,
    CreateMultiTodoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), // ToastrModule added
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    InternationalPhoneNumberModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'login',component:LoginComponent},
      {path:'',redirectTo:'login',pathMatch:'full'},
      {path:'register',component:RegisterComponent},
      {path:'home',component:HomeComponent,canActivate:[RouteGuardService]},
      {path:'forgot',component:ForgotComponent},
      {path:'reset/:token',component:ResetComponent},
      {path:'todo/:todoID',component:CreateTodoComponent,canActivate:[RouteGuardService]},
      {path:'friends',component:FriendsComponent,canActivate:[RouteGuardService]},
      {path:'multitodo',component:MultiTodoComponent,canActivate:[RouteGuardService]},
      {path:'viewmultitodo/:todoId',component:CreateMultiTodoComponent}
    ])
    
  ],
  providers: [UserHttpService,CookieService,HttpClientModule,RouteGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
