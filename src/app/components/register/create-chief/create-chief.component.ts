import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'

@Component({
	selector: 'create-chief',
	templateUrl: 'create-chief.component.html',
	styleUrls:['create-chief.component.scss']
})
export class CreateChiefComponent {
	registerOsbb:FormGroup; 
	model:any = {};
	phone:number;

	constructor(private fb: FormBuilder) {
		this.registerOsbb = this.fb.group({
			firstName: ['', Validators.compose([Validators.required])],
			lastName: ['', Validators.compose([Validators.required])],
			phone: ['', Validators.compose([Validators.required,
				Validators.minLength(9),Validators.maxLength(9),Validators.pattern("^(0|[1-9][0-9]*)$")])],
			email: ['', Validators.compose([Validators.required,
				Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")])],
			password: ['',Validators.compose([Validators.required])],
			osbbName: ['', Validators.compose([Validators.required])],
			osbbStreet: ['', Validators.compose([Validators.required])]
		});	
	}

	register(){
		this.model.phone = '+380'+ this.phone;
		console.log(this.model);
	}

}