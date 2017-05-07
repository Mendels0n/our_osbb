import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { NewsfeedService } from '../../../../services/newsfeed.service';
@Component({
    selector: 'news',
    templateUrl: 'news.component.html',
    styleUrls: ['news.component.scss']
})
export class NewsComponent implements OnInit {
    form:FormGroup;
    private config: any;
    news:any = {};
    newsId:any;
    error:string;

    constructor(private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute, private newsfeedService:NewsfeedService) { 
        this.form = this.fb.group({
            title: ['', Validators.compose([Validators.required,Validators.minLength(3)])],
            content: ['',Validators.compose([Validators.required,Validators.minLength(5 )])]
        });
        this.newsId = this.route.snapshot.params['id'];
        this.config = {
            toolbarGroups: [
                { 'name': 'basicstyles', 'groups': ['basicstyles'] },
                { 'name': 'links', 'groups': ['links'] },
                { 'name': 'paragraph', 'groups': ['list', 'blocks'] },
                { 'name': 'styles', 'groups': ['styles'] }
            ],
            removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar',
            extraPlugins: 'divarea'
        };
    }

    ngOnInit() {
        if (this.newsId) {
            this.loadNews();
        }
    }
    loadNews() {
        this.newsfeedService.getNews(this.newsId).subscribe(
            news =>{
                this.news = news;
            }
        )
    }
    create() {
        if (this.newsId) {
            this.news.user_id = JSON.parse(localStorage.getItem('user_id'));
            this.newsfeedService.editNews(this.newsId,this.news).subscribe(
                data => {
                    this.router.navigate(['/newsfeed', this.newsId])
                },
                error => {
                    console.log(error);
                }
            )
        } else {
            this.news.user_id = JSON.parse(localStorage.getItem('user_id'));
            this.newsfeedService.createNews(this.news).subscribe(
                data => {
                    this.router.navigate(['/'])
                },
                error => {
                    console.log(error);
                    this.error = error;
                }
            )
        }
    }
}