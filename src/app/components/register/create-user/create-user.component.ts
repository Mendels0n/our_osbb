import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { moveInLeft, fallIn } from "../../../router.animations";

import { OsbbService } from "../../../services/osbb.service";
import { UserService } from '../../../services/user.service';
import { OSBB } from "../../../models/osbb.model";

@Component({
    selector: 'create-user',
    templateUrl: 'create-user.component.html',
    styleUrls: ['create-user.component.scss'],
    animations: [moveInLeft(), fallIn()]
})
export class CreateUserComponent implements OnInit {
    osbbID: number;
    data: OSBB;
    registerUser: FormGroup;
    registerOsbb: FormGroup;
    osbbForm: boolean;
    userForm: boolean;
    osbb: OSBB;
    error: string;
    state: string = '';
    model: any = {};

    constructor(private fb: FormBuilder, private activeRoute: ActivatedRoute, private route: Router,
        private osbbService: OsbbService, private userService: UserService) {
        this.data = new OSBB;
        this.osbbID = this.activeRoute.snapshot.params['id'];
        this.registerOsbb = this.fb.group({
            country: ['', Validators.compose([Validators.required])],
            city: ['', Validators.compose([Validators.required])],
            street: ['', Validators.compose([Validators.required])],
            houseNumber: ['', Validators.compose([Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$"), Validators.maxLength(5)])],
            osbbNumber: ['', Validators.compose([Validators.pattern("^(0|[1-9][0-9]*)$")])]
        });
        this.registerUser = this.fb.group({
            name: ['', Validators.compose([Validators.required])],
            apartment: ['', Validators.compose([Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$"), Validators.maxLength(3)])],
            email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")])],
            password: ['', Validators.compose([Validators.required])]
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

    loadOsbb() {
        if (this.osbbID) {
            this.osbbService.getAll()
            .subscribe(
                osbb => {
                    this.osbb = osbb.find((item: any) => item.id == this.osbbID);
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
                },
                error => {
                    this.error = error;
                })
        } else {
            this.model.role = 2;
            this.model.street = this.model.street + ' ' + this.model.house_number;
            this.osbbService.createOsbb(this.model).subscribe(
                data => {
                    this.model.osbb_id = data.id;
                    this.userService.create(this.model).subscribe(
                        data => {
                            this.route.navigate(['/login']);
                        }
                    )
                }
            )
        }
    }
}
