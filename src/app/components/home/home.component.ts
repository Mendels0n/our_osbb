import { Component, OnInit } from '@angular/core';
import {moveInLeft, fallIn} from "../../router.animations";
import { UserService } from '../../services/user.service';


@Component({
	selector: 'home',
	templateUrl: 'home.component.html',
	styleUrls:['home.component.scss'],
	animations: [fallIn(), moveInLeft()]
})
export class HomeComponent implements OnInit {
	title:string;
	state:string = '';
	constructor(private userService: UserService) {}
	ngOnInit() {
		this.title = "HomeComponent"
	}
}