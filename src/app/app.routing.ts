import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";

import {AppComponent} from "./app.component";
import { RegisterComponent } from './components/register/register.component';

const appRoutes: Routes = [
    { path: '', component: AppComponent},
    { path: 'register', component: RegisterComponent},
    { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
