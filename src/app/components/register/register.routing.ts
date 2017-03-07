import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateUserComponent } from './create-user/create-user.component';
import { CreateChiefComponent } from './create-chief/create-chief.component';

const registerRoutes: Routes = [
  { path: 'create-user',  component: CreateUserComponent },
  { path: 'create-chief', component: CreateChiefComponent }
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