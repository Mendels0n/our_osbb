import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Votes } from '../../../../models/votes.model';
import { VotesService } from '../../../../services/votes.service';
import { UserService } from '../../../../services/user.service';

@Component({
    selector: 'vote',
    templateUrl: 'vote-detail.component.html',
    styleUrls: ['vote-detail.component.scss']
})
export class VoteDetailComponent implements OnInit {
    voteId:string;
    vote:Votes;
    messageAgree:string;
    userId:string;
    constructor(private route:ActivatedRoute, private router:Router, private votesService:VotesService,private userService:UserService) { 
        this.voteId = this.route.snapshot.params['id'];
        this.userId = localStorage.getItem('user_id');
    }

    ngOnInit() {
        this.loadVotes();
     }
    loadVotes(){
        this.votesService.getVotes(this.voteId).subscribe(
            data =>{
                this.vote = data;
                this.getAllAgree();
                this.getAllNotAgree();
                this.check();
            }
        )
    }
    agree() {
        this.userService.userById(this.userId).subscribe(
            data => {
                this.votesService.agree(this.voteId, this.voteId, data.room).subscribe(
                    data => {
                        console.log(data);
                    },
                    error => {
                        console.log(error);
                    }
                )
            }
        )
    }
    check(){
        this.votesService.checkAgree(this.voteId,this.userId).subscribe(
            data => {
                console.log(data);
            }
        )
        this.votesService.checkNotAgree(this.voteId,this.userId).subscribe(
            data =>{
                console.log('Not Agree',data);
            }
        )
    }
    notAgree() {
        this.userService.userById(this.userId).subscribe(
            data => {
                this.votesService.notAgree(this.voteId, this.voteId, data.room).subscribe(
                    data => {
                        console.log(data);
                    },
                    error => {
                        console.log(error);
                    }
                )
            }
        )
    }
    getAllAgree(){
        this.votesService.getAllAgree(this.voteId).subscribe(
            data => {
                console.log(data);
            },
            error => {
                console.log(error);
            }
        )
    }
    getAllNotAgree(){
        this.votesService.getAllNotAgree(this.voteId).subscribe(
            data => {
                console.log(data);
            },
            error => {
                if(error == 'Vote is not exist in this osbb'){
                    this.messageAgree = "";
                }
            }
        )
    }
}