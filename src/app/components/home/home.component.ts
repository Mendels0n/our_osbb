import { Component, OnInit } from '@angular/core';
import {moveInLeft, fallIn} from "../../router.animations";

@Component({
	selector: 'home',
	templateUrl: 'home.component.html',
	animations: [fallIn(), moveInLeft()]
})
export class HomeComponent implements OnInit {
	title:string;
	state:string = '';
	constructor() {}

	ngOnInit() {
		this.title = "HomeComponent"
	}
}