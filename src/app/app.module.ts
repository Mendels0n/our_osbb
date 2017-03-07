import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ComponentModule } from './components/component.module';
import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from "./app.component";

@NgModule({
    imports: [
        BrowserModule,
        ComponentModule,
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
