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
import { OsbbService } from '../../services/osbb.service';
import { UserService } from '../../services/user.service';
import { AgmCoreModule } from "angular2-google-maps/core";


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		DirectivesModule,
		 AgmCoreModule.forRoot({ apiKey: "AIzaSyDGNmaoVp7ASdGP6c5X4iHK3swJli3Vpi0", libraries: ["places"]}),
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
	providers: [	
		OsbbService,
		UserService
	]
})
export class RegisterModule { }
