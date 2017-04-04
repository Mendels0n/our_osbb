import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { CollapseModule } from "ng2-bootstrap/collapse";

@NgModule({
    imports:[
        CommonModule,
        RouterModule,
        CollapseModule.forRoot()
    ],
    declarations: [ 
        NavbarComponent
    ],
    exports: [
        NavbarComponent
    ],
    providers: [
    ]
})
export class SharedModule {}