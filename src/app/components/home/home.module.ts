import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'
import { BsDropdownModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CKEditorModule } from 'ng2-ckeditor';

import { HomeComponent } from './home.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { NewsDetailComponent } from './newsfeed/news-detail/news-detail.component';
import { NewsComponent } from './newsfeed/news/news.component';
import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home.routing';
import { UserListComponent } from './user-list/user-list.component';
import { CommentsComponent } from './newsfeed/news-detail/comments/comments.component';
import { CommentComponent } from './newsfeed/news-detail/comments/comment/comment.component';
import { DirectivesModule } from '../../directives/directives.module';
import { UnregisteretService } from '../../services/unregisteret.service';
import { NewsfeedService } from '../../services/newsfeed.service';
import { CommentsService } from '../../services/comments.service';
import { PipesModule } from '../../pipes/pipes.module'

@NgModule({
	imports: [ 
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		HomeRoutingModule,
		DirectivesModule,
		SharedModule,
		PipesModule,
		CKEditorModule,
		BsDropdownModule.forRoot(),
		ModalModule.forRoot(),
		HttpModule
	],
	declarations: [ 
		HomeComponent,
		NewsfeedComponent,
		NewsComponent,
		NewsDetailComponent,
		CommentComponent,
		CommentsComponent,
		UserListComponent
	],
	exports: [ 
		HomeComponent
	],
	providers: [ UnregisteretService, NewsfeedService, CommentsService ]
})
export class HomeModule { }