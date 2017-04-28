import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { CommentsService } from '../../../../../services/comments.service';

@Component({
    selector: 'comments',
    templateUrl: 'comments.component.html',
    styleUrls: ['comments.component.scss']
})
export class CommentsComponent implements OnInit {
    form:FormGroup;
    newsId:any;
    comments:any;
    commentBody:any;
    model:any = {};

    constructor(private fb: FormBuilder,private activeRoute: ActivatedRoute, private commentsService:CommentsService) { 
        this.form = this.fb.group({
            comment: ['', Validators.compose([Validators.required])]
        });
        this.newsId = this.activeRoute.snapshot.params['id'];
    }
    ngOnInit() { 
        this.loadComments();
        // setInterval(()=> this.checkChanges(),9000);
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
                console.log(data);
                this.comments.push(data);
            }
        )
    }
    deleteComment(event:Event){
        let index = this.comments.indexOf(event);
        this.comments.splice(index,1);
    }
    // checkChanges(){
    //     this.commentsService.getComments(this.newsId).subscribe(
    //         data =>{
    //             if(this.arrayEquals(this.comments,data)){
                  
    //             }else{
    //                 console.log('Новые комменты');
    //             }
    //         }
    //     )
    // }
    // arrayEquals(x1:any[],x2:any[]){
    //     return JSON.stringify(x1) == JSON.stringify(x2);
    // }
}