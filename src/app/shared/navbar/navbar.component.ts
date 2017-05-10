import { Component, OnInit} from '@angular/core';
import { Router, NavigationStart} from '@angular/router';
import { Location, } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    token: boolean;
    public isCollapsed: boolean = true;
    title: string;
    welcomePage:boolean;

    constructor(public userService: UserService, private router: Router, private location: Location) {
        this.title = "Our OSBB";
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
               (event.url == '/welcome' || event.url == '/welcome#about') ? this.welcomePage = true : this.welcomePage = false;
            }
        });
    }
    ngOnInit() {   
    }
    
    logout() {
        localStorage.clear();
        this.router.navigate(['/login']);

    }

    public collapsed(event: any): void {}
    public expanded(event: any): void {}
}