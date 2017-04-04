import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from "@angular/http";
import { OsbbService } from "./osbb.service";


@NgModule({
    imports: [
        CommonModule,
        HttpModule
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        OsbbService
    ]
})
export class ServiceModule { }