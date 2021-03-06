import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CKEditorModule } from 'ng2-ckeditor';
import { MomentModule } from 'angular2-moment';
import { NguiDatetimePickerModule, NguiDatetime } from '@ngui/datetime-picker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

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
import { UnregisteretService, NewsfeedService, CommentsService, VotesService, PagerService, MessagesService } from '../../services/index';
import { PipesModule } from '../../pipes/pipes.module';
import { VotesComponent } from './votes/votes.component';
import { VoteComponent } from './votes/vote/vote.component';
import { VoteDetailComponent } from './votes/vote-detail/vote-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { MessagesComponent, MessageComponent, CreateMessageComponent } from './messages/index';

NguiDatetime.locale = {

    date: 'дата',
    time: 'время',

    year: 'год',
    month: 'месяц',
    day: 'день',
    hour: 'часов',
    minute: 'минут',
    currentTime: "текущие время"

};

@NgModule({
	imports: [ 
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		HomeRoutingModule,
		DirectivesModule,
		NguiDatetimePickerModule,
		NguiAutoCompleteModule,
		SharedModule,
		PipesModule,
		CKEditorModule,
		MomentModule,
		PaginationModule.forRoot(),
		BsDropdownModule.forRoot(),
		ModalModule.forRoot(),
		HttpModule
	],
	declarations: [ 
		HomeComponent,
		NewsfeedComponent,
		NewsComponent,
		NewsDetailComponent,
		ProfileComponent,
		CommentComponent,
		CommentsComponent,
		MessagesComponent,
		MessageComponent,
		CreateMessageComponent,
		VotesComponent,
		VoteDetailComponent,
		VoteComponent,
		UserListComponent
	],
	exports: [ 
		HomeComponent
	],
	providers: [ UnregisteretService, NewsfeedService, CommentsService, VotesService, PagerService, MessagesService ]
})
export class HomeModule { }