import { Component, OnInit } from '@angular/core';
import { VotesService } from '../../../services/votes.service';
import { Votes } from '../../../models/votes.model';

@Component({
    selector: 'votes',
    templateUrl: 'votes.component.html',
    styleUrls: ['votes.component.scss']
})
export class VotesComponent implements OnInit {
    votes:Votes;
    term:string;
    constructor(private votesService:VotesService) { }

    ngOnInit() { 
        this.loadVotes();
        this.term = 'all';
    }

    loadVotes(){
        this.votesService.getAllVotes().subscribe(
            data =>{
                this.votes = data;
            }
        )
    }
    checkDate(date: string) {
        let nowDate = new Date();
        let endDate = new Date(date);
        if (nowDate >= endDate) {
            return false;
        } else {
            return true;

        }
    }
    
}