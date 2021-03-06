import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NewsfeedService } from '../../../../services/newsfeed.service';
import { UserService } from '../../../../services/user.service'; 
import { News } from '../../../../models/news.model';


@Component({
    selector: 'news-detail',
    templateUrl: 'news-detail.component.html',
    styleUrls: ['news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
    news: News;
    comments:any;
    role:string;
    mainRole:string;
    loading:boolean;
    userId:string;
    constructor(private router:Router,private activeRoute: ActivatedRoute, private newsfeedService: NewsfeedService, private userService:UserService) {
        this.news = new News;
        this.userId = localStorage.getItem('user_id');
        this.mainRole = "main";
        this.loadRole();
    }

    ngOnInit() {
        this.loadNews();
    }
    loadRole(){
        this.role = localStorage.getItem('role');
        this.role = this.role.replace(/"/g,'');
    }
    loadNews() {
        this.loading = true;
        let newsId = this.activeRoute.snapshot.params['id'];
        this.newsfeedService.getNews(newsId).subscribe(
            news => {
                this.news = news;
                this.loading = false;
            }
        )
    }
    deleteNews(id:any){
        this.newsfeedService.deleteNews(id).subscribe(
            data =>{
                this.router.navigate(['/'])
            }
        )
    }

}