import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { UserService } from "../../services/user.service";
import { moveInLeft } from "../../router.animations";

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    animations: [moveInLeft()]
})
export class LoginComponent implements OnInit {
    user:any ={};
    loginForm:FormGroup;

    constructor(private service: UserService, private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            login: ['', Validators.compose([Validators.required])],
            password: ['',Validators.compose([Validators.required])]
        });
    }
    ngOnInit() { }
    login(){
        this.service.signIn(this.user.login, this.user.password)
            .subscribe(
                data =>{
                    console.log('+');
                },
                error =>{
                    console.log(error);
                }
            );
    }
}