import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Injectable({ providedIn: 'root' })
export class HandleErrorResponse{
    constructor(private router: Router, private spinner: NgxSpinnerService, private toastr: ToastrService){

    }
    handle(error: any){
        this.spinner.hide();
        console.log(error);
        if(error.status == 401){
            // this.authService.removeAllStorage();
            // this.router.navigate(['/login'], {})
        }else if(error.status == 403){
            this.toastr.error(error.error.message, 'Error');
            // this.authService.removeAllStorage();
            // this.router.navigate(['/login'], {})
        }else{
            this.toastr.error(error.error.message, 'Error');
        }
    }

    checkaccessToken(accessToken: any){
        if(accessToken==null || accessToken==undefined) this.router.navigate(['/login'], {});
    }
}