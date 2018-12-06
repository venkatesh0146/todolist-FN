import { Component, OnInit } from '@angular/core';
import { UserHttpService } from '../user-http.service';
import { CookieService } from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _http : UserHttpService,private cookieService: CookieService,private router:Router) { }
  value: string = this.cookieService.get('authToken');
  ngOnInit() {
    
  }
onSubmit(){
this._http.logout(this.value).subscribe(
  data =>{
    this.router.navigate(['/login']);
    this.cookieService.deleteAll();
  },
  error =>{

  }
);
}
}
