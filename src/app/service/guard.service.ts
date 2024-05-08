import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root'
})
class Authentication {

    constructor(private router: Router, private AuthService: AuthService) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(this.AuthService.isAuthenticatedUser()){
            return true;
        }else{
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }
    }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(Authentication).canActivate(next, state);
}