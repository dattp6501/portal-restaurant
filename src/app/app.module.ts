import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DishComponent } from './dish/dish.component';
import { TableComponent } from './table/table.component';
import { ProfileComponent } from './profile/profile.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DishDetailComponent } from './dish/dish-detail/dish-detail.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableDetailComponent } from './table/table-detail/table-detail.component';
import { ToastrModule, provideToastr } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DishComponent,
    TableComponent,
    ProfileComponent,
    TableComponent,
    DishDetailComponent,
    DashboardComponent,
    TableDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule, 
    MatPaginatorModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    provideAnimationsAsync(),
    provideAnimations(),
    provideToastr()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
