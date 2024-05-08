import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DishComponent } from './dish/dish.component';
import { TableComponent } from './table/table.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path:"login", component: LoginComponent},
  {path:"dish", component: DishComponent},
  {path:"table", component: TableComponent},
  {path:"profile", component: ProfileComponent},
  {path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
