import { appconfig } from '@appconfig/appconfig'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class DishService {

    constructor(private router: Router, private http: HttpClient, private authService: AuthService) {

    }
    getListDish(successCallback: (data: any) => void) {
      let user = this.authService.getUserInfoLocal();
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            "access_token": user?.accessToken+""
        });
        return this.http.get<Response>(`${appconfig.host_product}/api/product/manager/dish`, {headers}).subscribe({
            next: (data: any) => {
              successCallback(data.data);
            },
            error: (error) => {
              if(error.status == 401){
                
              }else if(error.status == 403){
                
              }else{
                // this.toastr.error(error.message);
              }
            },
            // complete() {
            // },
          });
    }

    getDishDetail(reqData: any,successCallback: (data: any) => void) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json', // Có thể thay đổi loại nội dung nếu cần
          });
        return this.http.get<Response>(`${appconfig.host_product}/api/product/user/dish/${reqData.dishId}`, {headers}).subscribe({
            next: (data: any) => {
              successCallback(data.data);
            },
            error: (error) => {
              if(error.status == 401){
                
              }else if(error.status == 403){
                
              }else{
                // this.toastr.error(error.message);
              }
            },
            // complete() {
            // },
          });
    }

    getListDishHot(successCallback: (data: any) => void) {
      const headers = new HttpHeaders({
          'Content-Type': 'application/json', // Có thể thay đổi loại nội dung nếu cần
      });
      return this.http.get<Response>(`${appconfig.host_product}/api/product/user/dish/hot`, {headers}).subscribe({
          next: (data: any) => {
            successCallback(data.data);
          },
          error: (error) => {
            if(error.status == 401){
              
            }else if(error.status == 403){
              
            }else{
              // this.toastr.error(error.message);
            }
          },
          // complete() {
          // },
        });
  }
}