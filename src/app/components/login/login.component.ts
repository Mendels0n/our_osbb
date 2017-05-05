import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from "../../services/user.service";
import { moveInLeft } from "../../router.animations";

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls:['login.component.scss'],
    animations: [moveInLeft()]
})
export class LoginComponent implements OnInit {
    user:any ={};
    loginForm:FormGroup;
    error:string;

    constructor(private service: UserService, private fb: FormBuilder, private router:Router) {
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
                   this.router.navigate(['/home'])
                },
                error =>{
                    (error == 'Unauthorized.')? this.error = 'Неверный емейл или пароль!': this.error = error;
                }
            );
    }
}
