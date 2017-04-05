import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'

import { HomeComponent } from './home.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home.routing';
import { UserListComponent } from './user-list/user-list.component';
import { UnregisteretService } from '../../services/unregisteret.service'


@NgModule({
	imports: [ 
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		HomeRoutingModule,
		SharedModule,
		HttpModule
	],
	declarations: [ 
		HomeComponent,
		NewsfeedComponent,
		UserListComponent
	],
	exports: [ 
		HomeComponent
	],
	providers: [ UnregisteretService ]
})
export class HomeModule { }