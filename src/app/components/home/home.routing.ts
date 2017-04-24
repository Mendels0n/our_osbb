import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { NewsDetailComponent } from './newsfeed/news-detail/news-detail.component';
import { NewsComponent } from './newsfeed/news/news.component';
import { HomeComponent } from './home.component';
import { UserListComponent } from './user-list/user-list.component';
import { AuthGuard } from '../../guards/auth.guards';
const homeRoutes: Routes = [{
  path: '',
  component: HomeComponent,
  canActivate: [AuthGuard],
  children: [{
    path: '',
    component: NewsfeedComponent
  },{
    path:'newsfeed/:item.id',
    component: NewsDetailComponent
  },{
    path:'users',
    component: UserListComponent
  },{
    path:'create-news',
    component: NewsComponent
  },{
    path:'edit-news/:id',
    component: NewsComponent
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
