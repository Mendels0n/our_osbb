import { Component, OnInit } from '@angular/core';
import { OsbbService } from "../../service/osbb.service";


@Component({
	selector: 'register',
	templateUrl: 'register.component.html',
	styleUrls:['register.component.scss']
})
export class RegisterComponent {
	osb: any;
	constructor(private osbb:OsbbService) {

	}
	ngOnInit() {
		this.osbb.getOsbb()
			.subscribe(data => {
				this.osb = data;
				console.log(this.osb);
			});
	}

}