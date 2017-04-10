import { Component, OnInit } from '@angular/core';
import { NewsfeedService } from '../../../services/newsfeed.service'; 
import { UserService } from '../../../services/user.service'; 

@Component({
    selector: 'newsfeed',
    templateUrl: 'newsfeed.component.html',
    styleUrls: ['newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {
    news: any;
    constructor(private newsfeedService: NewsfeedService,private userService:UserService) {}

    ngOnInit() {
        this.loadNews();
    }
    loadNews() {
        this.newsfeedService.allNews().subscribe(
            news => {
                this.news = news;
                console.log(news);
            },
            error => {
                console.log(error);
            }
        )
    }
    loadUser(id:number){
        this.userService.userById(id).subscribe(
            user => {
                console.log(user);
            }
        )
    }
}