import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { moveInLeft, fallIn } from "../../../router.animations";
import { checkUniqueEmail } from '../../../services/email-validator';
import { ElementRef, NgZone,ViewChild } from '@angular/core';

import { MapsAPILoader } from 'angular2-google-maps/core';

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
    public searchControl: FormControl;
    @ViewChild("search")
    public searchElementRef: ElementRef;
    registerOsbb: FormGroup;
    model: User;
    osbb: OSBB;
    osbbForm: boolean;
    userForm: boolean;
    required: string = 'Пожалуйста, заполните обязательные поле.';
    error: string;
    state: string = '';

    constructor(private fb: FormBuilder, private location: Location, private activeRoute: ActivatedRoute, private route: Router,
        private osbbService: OsbbService, private userService: UserService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
        this.osbb = new OSBB;
        this.model = new User;
        this.osbbID = this.activeRoute.snapshot.params['id'];
        this.registerOsbb = this.fb.group({
            country: ['', Validators.compose([Validators.required])],
            city: ['', Validators.compose([Validators.required])],
            street: ['', Validators.compose([Validators.required])],
            houseNumber: ['', Validators.compose([Validators.required, Validators.pattern("^(0|[1-9][0-9]/*)$"), Validators.maxLength(5)])],
            osbbNumber: ['', Validators.compose([Validators.required, , Validators.pattern("^(0|[1-9][0-9]*)$")])]
        });
        this.registerUser = this.fb.group({
            firstName: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            lastName: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            apartment: ['', Validators.compose([Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$"), Validators.maxLength(4)])],
            email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")],
                [checkUniqueEmail(this.userService, this)]
            ],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
    }

    ngOnInit() {
        if (this.osbbID) {
            this.changesForms(true, false);
            this.loadOsbb();
        } else {
            this.changesForms(false, true);
        }
       
        this.searchControl = new FormControl();
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    for (var i = 0; i < place.address_components.length; i++) {
                        var addressType = place.address_components[i].types[0];
                        if(addressType == 'street_number'){
                            this.osbb.house_number = place.address_components[i].long_name;
                        }else if(addressType == 'route'){
                            this.osbb.street = place.address_components[i].long_name;
                        }else if(addressType == 'locality'){
                            this.osbb.city = place.address_components[i].long_name;
                        }else if(addressType == 'country'){
                            this.osbb.country = place.address_components[i].long_name;
                        }
                    }
                });
            });
        });
    }
    back() {
        this.location.back();
    }
    loadOsbb() {
        this.osbbService.getOsbb(this.osbbID)
            .subscribe(osbb => {
                this.osbb = osbb;
            });
    }

    changesForms(userForm: boolean, osbbForm: boolean) {
        this.userForm = userForm; //true
        this.osbbForm = osbbForm; //false
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
            this.model.role = 1;
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
