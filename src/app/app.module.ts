import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { ComponentModule } from './components/component.module';
import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from "./app.component";
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './guards/auth.guards';

@NgModule({
    imports: [
        BrowserModule,
        ComponentModule,
        SharedModule,
       
        routing
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        appRoutingProviders,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
