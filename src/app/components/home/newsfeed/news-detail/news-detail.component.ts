import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'news-detail',
    templateUrl: 'news-detail.component.html',
    styleUrls: ['news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
    newsId:any;
    constructor(private activeRoute: ActivatedRoute) { }

    ngOnInit() {
        this.newsId = this.activeRoute.snapshot.params['id'];
     }
}