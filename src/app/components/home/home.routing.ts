import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { HomeComponent } from './home.component';
import { UserListComponent } from './user-list/user-list.component';

const homeRoutes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [{
    path: '',
    component: NewsfeedComponent
  },{
    path:'users',
    component: UserListComponent
  }]
}, ];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }