import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './data.service'
import { HttpModule } from "@angular/http";
import { OsbbService } from "./osbb.service";


@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService)
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