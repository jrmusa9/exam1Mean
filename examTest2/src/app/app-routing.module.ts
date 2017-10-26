import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component'
import {CreateComponent} from './create/create.component'
import {DashboardComponent} from './dashboard/dashboard.component'
import {PollComponent} from './poll/poll.component'

const routes: Routes = [
  {path:'', pathMatch:'full', component:LoginComponent},
  {path:'dashboard/:id', pathMatch:'full', component:DashboardComponent},
  {path:'create/:id', pathMatch:'full', component:CreateComponent},
  {path:'poll/:id', pathMatch:'full', component:PollComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
