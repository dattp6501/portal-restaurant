import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  constructor(private spinner: NgxSpinnerService, public authService: AuthService, private router: Router){

  }
  ngOnInit(): void {
    this.checkIsLogin();
  }

  logout(){
    this.spinner.show();
    this.authService.logout(this.authService.getAccessToken(),(data)=>{
      this.spinner.hide();
      this.router.navigate(['/login'], {});
    });
  }

  checkIsLogin(){
    let accessToken = this.authService.getAccessToken();
    if(accessToken){
      this.spinner.show();
      this.authService.getProfile(accessToken,(respData)=>{
        this.spinner.hide();
        this.authService.PROFILE = respData;
        this.authService.isAuthenticated = true;
      }, (error)=>{
        this.spinner.hide();
        this.authService.isAuthenticated = false;
      })
    }
  }
}

