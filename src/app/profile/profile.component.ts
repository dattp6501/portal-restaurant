import { AuthService } from '../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user? : User | undefined;
  constructor(private AuthService: AuthService){
    
  }
  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(){
    let user = this.AuthService.getUserInfoLocal();
    this.AuthService.getProfile(user?.accessToken+'',(user)=>{
      console.log(user);
    });
  }
}
