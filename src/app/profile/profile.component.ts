import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  constructor(private spinner: NgxSpinnerService, private authService: AuthService){
    
  }
  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(){
    let accessToken = this.authService.getAccessToken();

  }
}
