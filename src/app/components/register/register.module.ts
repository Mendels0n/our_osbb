import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';

import { RegisterComponent } from './register.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateChiefComponent } from './create-chief/create-chief.component';
import { RegisterRoutingModule } from './register.routing';
import { DirectivesModule } from '../../directives/directives.module';
@NgModule({
	imports: [ 
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		DirectivesModule,

		RegisterRoutingModule
	],
	declarations: [ 
		RegisterComponent,
		CreateUserComponent, 
		CreateChiefComponent 
	],
	exports: [ 
		RegisterComponent
	],
	providers: [ ]
})
export class RegisterModule { }