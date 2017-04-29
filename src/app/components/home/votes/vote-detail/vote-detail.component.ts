import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Votes } from '../../../../models/votes.model';
import { VotesService } from '../../../../services/votes.service';
import { UserService } from '../../../../services/user.service';

interface Button {
    agree:boolean;
    notAgree:boolean;
}
@Component({
    selector: 'vote',
    templateUrl: 'vote-detail.component.html',
    styleUrls: ['vote-detail.component.scss']
})

export class VoteDetailComponent implements OnInit {
    voteId: string;
    vote: Votes;
    messageAgree: string;
    userId: string;
    button:Button;
    loading:boolean;

    constructor(private route: ActivatedRoute, private router: Router, private votesService: VotesService, private userService: UserService) {
        this.voteId = this.route.snapshot.params['id'];
        this.userId = localStorage.getItem('user_id');
        this.button = {agree:false, notAgree:false};
        this.loading = false;
    }
    ngOnInit() {
        this.loadVotes();
        this.checkAllVotes();
        this.dateComparisons();
    }

    //All
    loadVotes() {
        this.votesService.getVotes(this.voteId).subscribe(
            data => {
                this.vote = data;
            }
        )
    }
    
    dateComparisons(){
        let nowDate = new Date();
        console.log(this.vote.end_date);
        console.log(nowDate);
         
    }    
    checkAllVotes() {
	console.time('Check all votes');
        this.votesService.checkAgree(this.voteId, this.userId).subscribe(
            data => {
                if (data == null) {
                    this.button.agree = false;
                } else if (data.id) {
                    this.button.agree = true;

                }
            }
        )
        this.votesService.checkNotAgree(this.voteId, this.userId).subscribe(
            data => {
                if (data == null) {
                    this.button.notAgree = false;
                } else if (data.id) {
                    this.button.notAgree = true;
                }
            }
        )
    console.timeEnd('Check all votes');
    }
    
    actions(button: string) {
        console.time('actions');
        this.checkAllVotes();
        if (!this.loading) {
            if (!this.button.agree && !this.button.notAgree) {
                if (button == 'agree') {
                    this.agree();
                } else if (button == 'notAgree') {
                    this.notAgree();
                }
            } else if (this.button.agree && !this.button.notAgree) {
                if (button == 'agree') {
                    this.deleteAgree();
                } else if (button == 'notAgree') {
                    this.deleteAgree();
                    this.notAgree();
                }
            } else if (!this.button.agree && this.button.notAgree) {
                if (button == 'agree') {
                    this.deleteNotAgree();
                    this.agree();
                } else if (button == 'notAgree') {
                    this.deleteNotAgree();
                }
            } else {
                this.deleteAgree();
                this.deleteNotAgree();
            }
        }else{
            console.log('Woow palelhce');
        }
        console.timeEnd('actions');
    }

    //Agree
    agree() {
        this.loading = true;
        this.userService.userById(this.userId).subscribe(
            data => {
                this.votesService.agree(this.voteId, this.voteId, data.room).subscribe(
                    data => {
                        this.button.agree = true;
                        this.loading = false;                                 
                    },
                    error => {
                        console.log(error);
                        this.button.agree = false;
                        this.loading = false;  
                    }
                )
            }
        )
    }

    deleteAgree() {
        this.loading = true;  
        this.votesService.checkAgree(this.voteId, this.userId).subscribe(
            data => {
                if (data !== null) {
                    this.votesService.deleteAgree(data.id, this.voteId).subscribe(
                        data => {
                            this.loading = false; 
                            this.button.agree = false;                            
                        },
                        error => {
                            this.button.agree = true;
                            this.loading = false;  
                        }
                    )
                }
            }
        )
    }
    getAllAgree() {
        this.votesService.getAllAgree(this.voteId).subscribe(
            data => {
                console.log('get all agree votes');                
                console.log(data);
            },
            error => {
                console.log(error);
            }
        )
    }
    //Not agree
    notAgree() {
        this.loading = true;  
        this.userService.userById(this.userId).subscribe(
            data => {
                this.votesService.notAgree(this.voteId, this.voteId, data.room).subscribe(
                    data => {
                        this.button.notAgree = true;
                        this.loading = false;  
                    },
                    error => {
                        this.button.notAgree = false;
                        this.loading = false;  
                    }
                )
            }
        )
    }
    deleteNotAgree() {
        this.loading = true;  
        this.votesService.checkNotAgree(this.voteId, this.userId).subscribe(
            data => {
                if (data !== null) {
                    this.votesService.deleteNotAgree(data.id, this.voteId).subscribe(
                        data => {
                            this.button.notAgree = false; 
                            this.loading = false;            
                        },
                        error => {
                        this.button.notAgree = true;  
                        this.loading = false;                           
                            console.log(error)
                        }
                    )
                }
            }
        )
    }
    getAllNotAgree() {
        this.votesService.getAllNotAgree(this.voteId).subscribe(
            data => {
                 console.log('get all not agree votes');   
                console.log(data);
            },
            error => {
                if (error == 'Vote is not exist in this osbb') {
                    this.messageAgree = "";
                }
            }
        )
    }
}