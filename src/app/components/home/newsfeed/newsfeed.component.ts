import { Component, OnInit } from '@angular/core';
import { NewsfeedService } from '../../../services/newsfeed.service'; 
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'newsfeed',
    templateUrl: 'newsfeed.component.html',
    styleUrls: ['newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {
    news: any;
    comments: any;
    role: string;
    mainRole: string;
    term:string;

    constructor(private newsfeedService: NewsfeedService, private userService: UserService, private router: Router) {
        this.mainRole = "main";
        this.loadRole();
        this.term = 'all';
    }

    ngOnInit() {
        this.loadNews();
    }
    loadRole() {
        this.role = localStorage.getItem('role');
        this.role = this.role.replace(/"/g, '');
    }
    loadNews() {
        this.newsfeedService.allNews().subscribe(
            news => {
                this.news = news;
            },
            error => {
                if (error == 'Unauthorized. Invalid or expired token.') {
                    localStorage.clear();
                    this.router.navigate(['/login']);
                }
            }
        )
    }
}