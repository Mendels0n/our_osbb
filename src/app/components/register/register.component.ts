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
	osbb: any;
	state:string = '';

	constructor(private service:OsbbService) {}
	ngOnInit() {
		this.service.getAll()
			.then(data => {
				this.osbb = data;
			});
	}

}