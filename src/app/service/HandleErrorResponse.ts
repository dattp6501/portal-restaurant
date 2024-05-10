import { Injectable } from "@angular/core";
import { Router } from "@angular/router"
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class HandleErrorResponse{
    constructor(private router: Router){

    }
    handle(data: any){
        if(data.status == 401){
            // this.authService.removeAllStorage();
            // this.router.navigate(['/login'], {})
        }else if(data.status == 403){
            // this.authService.removeAllStorage();
            // this.router.navigate(['/login'], {})
        }else{
            
        }
    }

    checkaccessToken(accessToken: any){
        if(accessToken==null || accessToken==undefined) this.router.navigate(['/login'], {});
    }
}