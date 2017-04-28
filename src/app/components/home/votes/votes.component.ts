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
    constructor(private votesService:VotesService) { }

    ngOnInit() { 
        this.loadVotes();
    }

    loadVotes(){
        this.votesService.getAllVotes().subscribe(
            data =>{
                this.votes = data;
                console.log(data);
            }
        )
    }
}