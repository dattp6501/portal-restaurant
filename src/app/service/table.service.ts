import { appconfig } from '@appconfig/appconfig'
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { HandleErrorResponse } from './HandleErrorResponse';

@Injectable({ providedIn: 'root' })
export class TAbleService {

  constructor(private handleError: HandleErrorResponse, private http: HttpClient, private authService: AuthService) {

  }
  getListTable(reqData: any, successCallback: (data: any) => void) {
    let accessToken = this.authService.getAccessToken();
    if (!reqData.size) reqData.size = 10;
    if (!reqData.page) reqData.page = 0;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "access_token": accessToken,
    });
    return this.http.get<any>(`${appconfig.HOST_PRODUCT}/api/product/manage/table?size=${reqData.size}&page=${reqData.page}`, { headers }).subscribe({
      next: (data: any) => {
        successCallback(data.data);
      },
      error: (error) => {
        this.handleError.handle(error);
      },
      // complete() {
      // },
    });
  }

  getTableDetail(dishId: any, successCallback: (data: any) => void) {
    let accessToken = this.authService.getAccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "access_token": accessToken
    });
    return this.http.get<Response>(`${appconfig.HOST_PRODUCT}/api/product/manage/table/${dishId}`, { headers }).subscribe({
      next: (data: any) => {
        successCallback(data.data);
      },
      error: (error) => {
        this.handleError.handle(error);
      },
      // complete() {
      // },
    });
  }

  updateTable(reqData: any, successCallback: (data: any) => void) {
    let accessToken = this.authService.getAccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "access_token": accessToken
    });
    return this.http.post<any>(`${appconfig.HOST_PRODUCT}/api/product/manage/table/update_table`, reqData, { headers }).subscribe({
      next: (data: any) => {
        successCallback(data);
      },
      error: (error) => {
        this.handleError.handle(error);
      },
      // complete() {
      // },
    });
  }

  createTable(reqData: any,successCallback: (data: any) => void) {
    let accessToken = this.authService.getAccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "access_token": accessToken
    });
    return this.http.post<any>(`${appconfig.HOST_PRODUCT}/api/product/manage/table/save`, reqData, {headers}).subscribe({
        next: (data: any) => {
          successCallback(data);
        },
        error: (error) => {
          this.handleError.handle(error);
        },
        // complete() {
        // },
      });
}
}