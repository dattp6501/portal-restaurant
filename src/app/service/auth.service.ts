import { appconfig } from '@appconfig/appconfig'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../model/User';

@Injectable({ providedIn: 'root' })
export class AuthService {
	// private userSubject: BehaviorSubject<User | null>;
	// public user: Observable<User | null>;

	constructor(private router: Router, private http: HttpClient) {
		// this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
		// this.user = this.userSubject.asObservable();
	}

	getProfile(accesToken: String, successCallback: (data: any) => void) {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			"access_token": accesToken + ""
		});
		return this.http.get<any>(`${appconfig.host_auth}/api/user/detail`, { headers }).subscribe({
			next: (data: any) => {
				successCallback(data.data);
			},
			error: (error) => {
				if (error.status == 401) {

				} else if (error.status == 403) {

				} else {
					// this.toastr.error(error.message);
				}
			},
			// complete() {
			// },
		});
	}

	login(reqData: any, successCallback: (resp: any) => void) {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json', // Có thể thay đổi loại nội dung nếu cần
		});
		return this.http.post<any>(`${appconfig.host_auth}/api/user/login`, reqData, { headers }).subscribe({
			next: (data: any) => {
				localStorage.setItem("isAuthenticated", "true");
				successCallback(data.data);
			},
			error: (error) => {
				if (error.status == 401) {
					// this.toastr.error(error.message);
				} else if (error.status == 403) {
					// this.toastr.error(error.message);
				} else {
					// this.toastr.error(error.message);
				}
			},
			// complete() {
			// },
		});
	}

	logout(accesToken: String, successCallback: (resp: any) => void) {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'access_token': accesToken+''
		});
		return this.http.post<any>(`${appconfig.host_auth}/api/user/logout`, { headers }).subscribe({
			next: (data: any) => {
				localStorage.removeItem("isAuthenticated");
				localStorage.removeItem("userInfo");
				successCallback(data);
			},
			error: (error) => {
				if (error.status == 401) {
					// this.toastr.error(error.message);
				} else if (error.status == 403) {
					// this.toastr.error(error.message);
				} else {
					// this.toastr.error(error.message);
				}
			},
			// complete() {
			// },
		});
	}

	getUserInfoLocal() {
		let user = new User();
		let data = localStorage.getItem("userInfo");
		if (data == null) return null;
		let userInfo = JSON.parse(data);
		user.id = userInfo.id;
		user.username = userInfo.username;
		user.accessToken = userInfo.accessToken;
		user.refreshToken = userInfo.refreshToken;
		user.avatar = userInfo.avatar;
		return user;
	}

	refreshToken(successCallback: (resp: any) => void) {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json', // Có thể thay đổi loại nội dung nếu cần
		});
		let user = this.getUserInfoLocal();
		if (user == null) return;
		let reqData = {
			"userId": user.id,
			"refreshToken": user.refreshToken
		};
		return this.http.post<any>(`${appconfig.host_auth}/api/user/refresh_token`, reqData, { headers }).subscribe({
			next: (data: any) => {
				localStorage.setItem("isAuthenticated", "true");
				successCallback(data.data);
			},
			error: (error) => {
				if (error.status == 401) {
					// this.toastr.error(error.message);
				} else if (error.status == 403) {
					// this.toastr.error(error.message);
				} else {
					// this.toastr.error(error.message);
				}
			},
			// complete() {
			// },
		});
	}

	isAuthenticatedUser(): boolean {
		let result = localStorage.getItem("isAuthenticated");
		return result == "true";
	}
}