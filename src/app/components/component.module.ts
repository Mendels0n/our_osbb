import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RegisterModule } from './register/register.module';


@NgModule({
	imports: [ 
		CommonModule,
		RegisterModule
	],
	declarations: [ 
	],
	exports: [ 
	],
	providers: [ ]
})
export class ComponentModule { }