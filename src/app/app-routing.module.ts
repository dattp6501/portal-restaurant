import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DishComponent } from './dish/dish.component';
import { TableComponent } from './table/table.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './service/guard.service';
import { DishDetailComponent } from './dish/dish-detail/dish-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableDetailComponent } from './table/table-detail/table-detail.component';

const routes: Routes = [
  {path:"login", component: LoginComponent},
  {path:"dish", component: DishComponent, canActivate:[AuthGuard]},
  {path:"dish/:dish_id", component: DishDetailComponent, canActivate:[AuthGuard]},
  {path:"table", component: TableComponent, canActivate:[AuthGuard]},
  {path:"table/:table_id", component: TableDetailComponent, canActivate:[AuthGuard]},
  {path:"profile", component: ProfileComponent, canActivate:[AuthGuard]},
  {path:"dashboard", component: DashboardComponent, canActivate:[AuthGuard]},
  {path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
