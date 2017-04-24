import { Component, OnInit } from '@angular/core';
import { OsbbService } from "../../services/osbb.service";
import { moveInLeft, fallIn } from "../../router.animations";


@Component({
	selector: 'register',
	templateUrl: 'register.component.html',
	styleUrls:['register.component.scss'],
	animations: [fallIn(), moveInLeft()]
})
export class RegisterComponent implements OnInit{
	osbb:any;
	loading: boolean;
	state:string = '';

	constructor(private OsbbService:OsbbService) {}

	ngOnInit() {
		this.loading = true;
		this.OsbbService.getAll()
		.subscribe(
			data => {
				this.osbb = data;
				this.loading = false;
			},
			error => {
				console.log(error);
			}
		);
	}

}
