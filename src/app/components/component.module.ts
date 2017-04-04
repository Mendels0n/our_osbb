import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { RegisterModule } from './register/register.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from "./login/login.module";



@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HomeModule,
		LoginModule,
		RegisterModule
	],
	declarations: [
	],
	exports: [
	],
	providers: [ ]
})
export class ComponentModule { }
