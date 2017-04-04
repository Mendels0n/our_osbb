import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';

import { HomeComponent } from './home.component';


@NgModule({
	imports: [ 
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule
	],
	declarations: [ 
		HomeComponent,
	],
	exports: [ 
		HomeComponent
	],
	providers: [ ]
})
export class HomeModule { }