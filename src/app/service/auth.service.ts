import { appconfig } from '@appconfig/appconfig'
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HandleErrorResponse } from './HandleErrorResponse';

@Injectable({ providedIn: 'root' })
export class AuthService {
	private isAuthenticated:boolean = false;
	public PROFILE: any;

	constructor(private handleError: HandleErrorResponse, private http: HttpClient) {
		this.PROFILE = {
			"username": "",
			"avatar": "",
		}
	}

	getProfile(accesToken: String, successCallback: (data: any) => void) {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			"access_token": accesToken + ""
		});
		return this.http.get<any>(`${appconfig.HOST_AUTH}/api/user/detail`, { headers }).subscribe({
			next: (data: any) => {
				this.PROFILE = data.data;
				successCallback(data.data);
			},
			error: (error) => {
				this.handleError.handle(error);
			},
			// complete() {
			// },
		});
	}

	login(reqData: any, successCallback: (resp: any) => void) {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json', // Có thể thay đổi loại nội dung nếu cần
		});
		return this.http.post<any>(`${appconfig.HOST_AUTH}/api/user/login`, reqData, { headers }).subscribe({
			next: (data: any) => {
				localStorage.setItem("accessToken", data.data.accessToken);
				localStorage.setItem("refreshToken", data.data.refreshToken);
				this.isAuthenticated = true;
				successCallback(data.data);
			},
			error: (error) => {
				this.handleError.handle(error);
			},
			// complete() {
			// },
		});
	}

	logout(acccessToken: any, successCallback: (resp: any) => void) {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'access_token': acccessToken
		});
		return this.http.post<any>(`${appconfig.HOST_AUTH}/api/user/logout`,{}, { headers }).subscribe({
			next: (data: any) => {
				localStorage.removeItem("accessToken");
				localStorage.removeItem("refreshToken");
				successCallback(data);
			},
			error: (error) => {
				localStorage.removeItem("accessToken");
				localStorage.removeItem("refreshToken");
				successCallback(error);
			},
			// complete() {
			// },
		});
	}

	refreshToken(successCallback: (resp: any) => void) {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json', // Có thể thay đổi loại nội dung nếu cần
		});
		let refreshToken = localStorage.getItem("refreshToken");
		let reqData = {
			"refreshToken": refreshToken
		};
		return this.http.post<any>(`${appconfig.HOST_AUTH}/api/user/refresh_token`, reqData, { headers }).subscribe({
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

	isAuthenticatedUser(): boolean {
		return this.isAuthenticated;
	}

	getAccessToken(){
		let accessToken = localStorage.getItem("accessToken");
		this.handleError.checkaccessToken(accessToken);
		return accessToken+"";
	}

	removeAllStorage(){
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
	}
}