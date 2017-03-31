import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import { LoginComponent } from "./login.component";
import { AlertModule } from 'ng2-bootstrap/alert';

import { UserService } from "../../services/user.service";



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AlertModule.forRoot()
    ],
    declarations: [
        LoginComponent
    ],
    exports: [
        LoginComponent
    ],
    providers: [ UserService ]
})
export class LoginModule { }
