import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateUserComponent } from './create-user/create-user.component';
import { RegisterComponent } from "./register.component";

const registerRoutes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'create', component: CreateUserComponent},
  { path: 'create/:id',  component: CreateUserComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(registerRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RegisterRoutingModule { }
