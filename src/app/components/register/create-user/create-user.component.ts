import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { moveInLeft } from "../../../router.animations";

import { OsbbService } from "../../../services/osbb.service";
import { OSBB } from "../../../models/osbb.model";

@Component({
	selector: 'create-user',
	templateUrl: 'create-user.component.html',
	styleUrls:['create-user.component.scss'],
	animations: [moveInLeft()]
})
export class CreateUserComponent implements OnInit {
	osbbID : number;
	data : OSBB;
	registerUser : FormGroup;
	phone:number;
	state:string = '';
	model:any = {};

	constructor(private fb: FormBuilder, private route: ActivatedRoute, private service: OsbbService ) {
		this.data = new OSBB;
		this.registerUser = this.fb.group({
			firstName: ['', Validators.compose([Validators.required])],
			lastName: ['', Validators.compose([Validators.required])],
			phone: ['', Validators.compose([Validators.required,
				Validators.minLength(9),Validators.maxLength(9),Validators.pattern("^(0|[1-9][0-9]*)$")])],
			apartment:['', Validators.compose([Validators.required,
				Validators.pattern("^(0|[1-9][0-9]*)$"),Validators.maxLength(3)])],
			email: ['', Validators.compose([Validators.required,
				Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")])],
			password: ['',Validators.compose([Validators.required])]
		});	
		}

		ngOnInit() {
			this.osbbID = this.route.snapshot.params['id'];
			this.service.getOsbb(this.osbbID)
				.then(data => {this.data = data;});
		}
		
		register(){
			this.model.osbb = this.data.name;
			this.model.phone = '+380'+ this.phone;
			console.log(this.model);
		}
	}