import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CollapseModule } from "ng2-bootstrap/collapse";

import { ComponentModule } from './components/component.module';
import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from "./app.component";
import { ServiceModule } from "./services/service.module";




@NgModule({
    imports: [
        BrowserModule,
        ComponentModule,
        CollapseModule.forRoot(),
        ServiceModule,
        routing
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        appRoutingProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
