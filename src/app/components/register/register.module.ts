import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap/alert';

import { RegisterComponent } from './register.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { RegisterRoutingModule } from './register.routing';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		DirectivesModule,
		PipesModule,
		AlertModule.forRoot(),
		RegisterRoutingModule
	],
	declarations: [
		RegisterComponent,
		CreateUserComponent
	],
	exports: [
		RegisterComponent,
	],
	providers: [ ]
})
export class RegisterModule { }
