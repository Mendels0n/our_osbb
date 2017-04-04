import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    public isCollapsed: boolean = true;
    title: string;

    constructor(private userService: UserService, private router:Router) {
        this.title = "ОСББ"
    }
    ngOnInit() {}
    
    logout(){
        localStorage.clear();
        this.router.navigate(['/login']);
    }

    public collapsed(event: any): void {}
    public expanded(event: any): void {}
}