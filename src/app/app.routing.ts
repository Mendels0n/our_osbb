import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";

import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { NewsfeedComponent } from './components/home/newsfeed/newsfeed.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
const appRoutes: Routes = [{
    path: '',
    loadChildren: 'app/components/home/home.module#HomeModule',
    data: {
        preload: true
    },
}, {
    path: 'login',
    component: LoginComponent
}, {
    path: 'welcome',
    component: WelcomePageComponent,
}, {
    path: '**',
    redirectTo: '',

}];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
