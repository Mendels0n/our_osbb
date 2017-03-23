import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


import { RegisterModule } from './register/register.module';
import { HomeModule } from './home/home.module';



@NgModule({
	imports: [ 
		CommonModule,
		FormsModule,
		ReactiveFormsModule,		
		HomeModule,
		RegisterModule
	],
	declarations: [ 
	],
	exports: [ 
	],
	providers: [ ]
})
export class ComponentModule { }