import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Votes } from '../../../../models/votes.model';
import { VotesService } from '../../../../services/votes.service';

@Component({
    selector: 'vote',
    templateUrl: 'vote.component.html',
    styleUrls: ['vote.component.scss']
})
export class VoteComponent implements OnInit {
    voteId: string;
    vote:Votes;
    form:FormGroup;
    error:string;
    nowDate:string;
    constructor(private fb:FormBuilder,private route: ActivatedRoute, private votesService:VotesService, private router:Router) {
        this.voteId = this.route.snapshot.params['id'];
    
        this.vote = new Votes;
        this.form = this.fb.group({
            title: ['', Validators.compose([Validators.required])],
            startDate: ['',Validators.compose([Validators.required])],
            endDate:['',Validators.compose([Validators.required])]
        });
    }

    ngOnInit() {
        this.loadInitDate();
        this.loadVotes();
    }
    loadInitDate(){
        let now = new Date();
        this.nowDate = new Date(now).toISOString();
    }
    
    loadVotes() {
        if (this.voteId) {
            this.votesService.getVotes(this.voteId).subscribe(
                data => {
                    this.vote = data;
                }
            )
        }
    }
    
    create() {
        if (this.voteId) {
            this.vote.start_date = new Date(this.vote.start_date).toISOString();
            this.vote.end_date = new Date(this.vote.end_date).toISOString();
            this.vote.user_id = JSON.parse(localStorage.getItem('user_id'));
            this.votesService.edit(this.voteId, this.vote).subscribe(
                data => {
                    this.router.navigate(['/votes', this.voteId])
                },
                error => {
                    console.log(error);
                }
            )
        } else {
            this.vote.start_date = new Date(this.vote.start_date).toISOString();
            this.vote.end_date = new Date(this.vote.end_date).toISOString();
            this.vote.user_id = JSON.parse(localStorage.getItem('user_id'));
            this.votesService.create(this.vote).subscribe(
                data => {
                    this.router.navigate(['/votes'])
                },
                error => {
                    console.log(error);
                    this.error = error;
                }
            )
        }
    }
}
