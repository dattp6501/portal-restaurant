import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  constructor(private spinner: NgxSpinnerService, private AuthService: AuthService){
    
  }
  ngOnInit(): void {
    this.spinner.show();
    this.getProfile();
  }

  getProfile(){
    let accessToken = this.AuthService.getAccessToken();
    this.AuthService.getProfile(accessToken,(user)=>{
      this.spinner.hide();
    });
  }
}
