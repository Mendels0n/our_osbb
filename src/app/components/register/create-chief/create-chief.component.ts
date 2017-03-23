import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { moveInLeft, fallIn } from "../../../router.animations";

import { OsbbService } from '../../../services/osbb.service';


@Component({
	selector: 'create-chief',
	templateUrl: 'create-chief.component.html',
	styleUrls:['create-chief.component.scss'],
	animations: [fallIn(), moveInLeft()]
})
export class CreateChiefComponent {
	registerChief:FormGroup;
	registerOsbb:FormGroup;
	model:any = {};
	phone:number;
	state:string = '';
	states:boolean = true;

	constructor(private fb: FormBuilder, private service: OsbbService, private router: Router) {
		this.registerChief = this.fb.group({
			firstName: ['', Validators.compose([Validators.required])],
			lastName: ['', Validators.compose([Validators.required])],
			phone: ['', Validators.compose([Validators.required,
				Validators.minLength(9),Validators.maxLength(9),Validators.pattern("^(0|[1-9][0-9]*)$")])],
			email: ['', Validators.compose([Validators.required,
				Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")])],
			password: ['',Validators.compose([Validators.required])]
		});
		this.registerOsbb = this.fb.group({
			osbbName: ['', Validators.compose([Validators.required])],
			osbbStreet: ['', Validators.compose([Validators.required])]
		});
	}
	changes(param:boolean){
		this.states = param;
	}
	register(){
		this.model.phone = '+380'+ this.phone;
		this.service.createOsbb(this.model).subscribe(
			data => {
				this.router.navigate(['/']);
				console.log(this.model);
			},
			error => {
				console.log(error);
			}
		);
	}

}