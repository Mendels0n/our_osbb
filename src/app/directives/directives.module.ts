import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


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