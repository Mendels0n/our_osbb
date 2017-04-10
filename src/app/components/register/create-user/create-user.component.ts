import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { moveInLeft, fallIn } from "../../../router.animations";
import { checkUniqueEmail } from '../../../services/email-validator';

import { OsbbService } from "../../../services/osbb.service";
import { UserService } from '../../../services/user.service';
import { OSBB } from "../../../models/osbb.model";
import { User } from "../../../models/user.model";

@Component({
    selector: 'create-user',
    templateUrl: 'create-user.component.html',
    styleUrls: ['create-user.component.scss'],
    animations: [moveInLeft(), fallIn()]
})
export class CreateUserComponent implements OnInit {
    osbbID: number;
    registerUser: FormGroup;
    registerOsbb: FormGroup;
    osbbForm: boolean;
    userForm: boolean;
    osbb: OSBB;
    email:FormControl;
    error: string;
    state: string = '';
    model: User;

    constructor(private fb: FormBuilder,private location:Location, private activeRoute: ActivatedRoute, private route: Router,
        private osbbService: OsbbService, private userService: UserService) {
        this.osbb = new OSBB;
        this.model = new User;
        this.osbbID = this.activeRoute.snapshot.params['id'];
        this.registerOsbb = this.fb.group({
            country: ['', Validators.compose([Validators.required])],
            city: ['', Validators.compose([Validators.required])],
            street: ['', Validators.compose([Validators.required])],
            houseNumber: ['', Validators.compose([Validators.required, Validators.pattern("^(0|[1-9][0-9]/*)$"), Validators.maxLength(5)])],
            osbbNumber: ['', Validators.compose([Validators.required,,Validators.pattern("^(0|[1-9][0-9]*)$")])]
        });
        this.registerUser = this.fb.group({
            firstName: ['', Validators.compose([Validators.required,Validators.minLength(2)])],
            lastName: ['', Validators.compose([Validators.required,Validators.minLength(2)])],
            apartment: ['', Validators.compose([Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$"), Validators.maxLength(4)])],
            email: ['',[Validators.required,Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")],[checkUniqueEmail(this.userService, this)]],
            password: ['', Validators.compose([Validators.required,Validators.minLength(6)])]
        });
    }

    ngOnInit() {
        if (this.osbbID) {
            this.userForm = true;
            this.osbbForm = false;
        } else {
            this.userForm = false;
            this.osbbForm = true;
        }
        this.loadOsbb();
    }
    back(){
        this.location.back();
    }
    emailValidation(control:any):any{
        return this.check(control);
    }
    check(control:any){
        console.log(control.value);
        this.userService.checkEmeil(control.value)
        .debounceTime(1000)
        .subscribe(
            data =>{
              console.log(data);
            }
        )
    }
    loadOsbb() {
        if (this.osbbID) {
            this.osbbService.getOsbb(this.osbbID)
            .subscribe(
                osbb => {
                    this.osbb = osbb;
                });
        }
    }

    changes() {
        this.userForm = true;
        this.osbbForm = false;
    }

    register() {
        if (this.osbbID) {
            this.model.role = 0;
            this.model.osbb_id = this.osbbID;
            this.model.street = this.osbb.street + ' ' + this.osbb.house_number;
            this.userService.create(this.model).subscribe(
                data => {
                    this.route.navigate(['/login']);
                    this.route.navigate
                },
                error => {
                    this.error = error;
                })
        } else {
            this.model.role = 2;
            this.model.street = this.osbb.street + ' ' + this.osbb.house_number;
            this.osbbService.createOsbb(this.osbb).subscribe(
                data => {
                    this.model.osbb_id = data.id;
                    this.userService.create(this.model).subscribe(
                        data => {
                            this.route.navigate(['/login']);
                        },
                        error => {
                            this.error = error;
                        }
                    )
                }
            )
        }
    }
}
