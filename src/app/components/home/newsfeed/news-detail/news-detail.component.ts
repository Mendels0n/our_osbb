import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NewsfeedService } from '../../../../services/newsfeed.service';
import { UserService } from '../../../../services/user.service'; 
 
class News{
    id:number;
    title:string;
    content:string;
    user_id:number;
    created_at:string;
    updated_at:string;
}

@Component({
    selector: 'news-detail',
    templateUrl: 'news-detail.component.html',
    styleUrls: ['news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
    news: News;
    comments:any;
    author:any;

    constructor(private router:Router,private activeRoute: ActivatedRoute, private newsfeedService: NewsfeedService, private userService:UserService) {
        this.news = new News;
    }

    ngOnInit() {
        this.loadNews();
    }
    loadNews() {
        let newsId = this.activeRoute.snapshot.params['item.id'];
        this.newsfeedService.getNews(newsId).subscribe(
            news => {
                this.news = news;
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