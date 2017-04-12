import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { CommentsService } from '../../../../../services/comments.service';

@Component({
    selector: 'comments',
    templateUrl: 'comment.component.html',
    styleUrls: ['comment.component.scss']
})
export class CommentComponent implements OnInit {
    form:FormGroup;
    newsId:any;
    comments:any;
    model:any = {};

    constructor(private fb: FormBuilder,private activeRoute: ActivatedRoute, private commentsService:CommentsService) { 
        this.form = this.fb.group({
            comment: ['', Validators.compose([Validators.required])]
        });
        this.newsId = this.activeRoute.snapshot.params['item.id'];
    }
    ngOnInit() { 
        this.loadComments();
    }
    loadComments(){
        this.commentsService.getComments(this.newsId).subscribe(
            comments =>{
                this.comments = comments;
            }
        )
    }
    createComment(){
        this.model.user_id = localStorage.getItem('user_id');
        this.model.newsfeed_id = this.newsId;
        this.commentsService.create(this.model).subscribe(
            data => {
                this.loadComments();
            }
        )
    }
}