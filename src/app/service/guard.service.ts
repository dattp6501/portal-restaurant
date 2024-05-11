import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root'
})
class Authentication {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return true;
        // if(this.authService.isAuthenticatedUser()){
        //     return true;
        // }else{
        //     this.authService.getProfile(this.authService.getAccessToken(),(data)=>{
                
        //     })
        //     return true;
        // }
    }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(Authentication).canActivate(next, state);
}