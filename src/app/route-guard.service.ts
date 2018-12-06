import { Injectable } from '@angular/core';
import {CanActivate,ActivatedRouteSnapshot,Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class RouteGuardService implements CanActivate{

  constructor( private router:Router,private cookieService: CookieService) { }
  canActivate(route : ActivatedRouteSnapshot): boolean{

  
    if(this.cookieService.get( 'authToken')==undefined||this.cookieService.get( 'authToken')==''||this.cookieService.get( 'authToken')==null){
      this.router.navigate(['/']);
      return false;
    }
    else {
      return true;
    }
  }
}

