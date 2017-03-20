import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';

import { ReadPasswordDirective } from './read-password.directive';


@NgModule({
	imports: [ 
		CommonModule
	],
	declarations: [
		ReadPasswordDirective 
	],
	exports: [ 
		ReadPasswordDirective
	]
})
export class DirectivesModule { }