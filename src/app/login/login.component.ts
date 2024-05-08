import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { User } from '../model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  
  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder){
    
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
        username: ['kh1', Validators.required],
        password: ['1', Validators.required]
    });
  }
  get f() { return this.loginForm.controls; }

  login(){
    console.log("login")
    if(this.loginForm.invalid) {
      return;
    }
    let reqData = {
      "username": this.f['username'].value, 
      "password": this.f['password'].value
    };
    let user = new User();
    this.authService.login(reqData,(respData)=>{ 
      user.username = reqData.username;
      user.accessToken = respData.accessToken;
      user.refreshToken = respData.refreshToken;
      this.authService.getProfile(user.accessToken+'', (userResp)=>{
        user.id = userResp.id;
        user.firstName = userResp.fullname;
        user.avatar = userResp.avatar;
        localStorage.removeItem("userInfo");
        localStorage.setItem("userInfo", JSON.stringify(user));
        this.router.navigate(['/profile'], {});
      })
    });
  }
}
