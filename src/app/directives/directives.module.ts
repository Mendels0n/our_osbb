import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadNameDirective } from './load-name.directive';


import { ReadPasswordDirective } from './read-password.directive';


@NgModule({
	imports: [ 
		CommonModule
	],
	declarations: [
		ReadPasswordDirective, 
		LoadNameDirective
	],
	exports: [ 
		ReadPasswordDirective,

		LoadNameDirective
	]
})
export class DirectivesModule { }