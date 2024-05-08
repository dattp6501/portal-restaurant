import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  isAuthenticated: boolean = false;
  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticatedUser();
  }

}

