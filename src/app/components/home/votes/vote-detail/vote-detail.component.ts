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
    userId: string;
    button:Button;
    loading:boolean;
    votesEnd:boolean;
    role:string = 'user';
    mainRole:string;
    count:any = {};

    constructor(private route: ActivatedRoute, private router: Router, private votesService: VotesService, private userService: UserService) {
        this.voteId = this.route.snapshot.params['id'];
        this.userId = localStorage.getItem('user_id');
        this.button = {agree:false, notAgree:false};
        this.loading = false;  
        this.mainRole = "main";
    }
    ngOnInit() {
        this.loadVotes();
        this.loadRole();
        this.checkAllVotes();
    }

    //All
    loadVotes() {
        this.votesService.getVotes(this.voteId).subscribe(
            data => {
                this.vote = data;
                let nowDate = new Date();
                let endDate = new Date(this.vote.end_date);
                if(nowDate >= endDate){
                    this.votesEnd = false; 
                     this.getAllAgree();
                     this.getAllNotAgree();
                     this.loadUsers();
                }else{
                    this.votesEnd = true;                
                }
            }
        )
    }
    loadUsers(){
        this.userService.getAllUsers().subscribe(
            data => {
                this.count.users = data.length;
            }
        )
    }

    loadRole(){
        this.role = localStorage.getItem('role');
        this.role = this.role.replace(/"/g,'');
    }

    checkAllVotes() {
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
    }
    
    
    actions(button: string) {
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
                    this.deleteAgree(false);
                } else if (button == 'notAgree') {
                    this.deleteAgree(true);
                }
            } else if (!this.button.agree && this.button.notAgree) {
                if (button == 'agree') {
                   this.deleteNotAgree(true)
                } else if (button == 'notAgree') {
                    this.deleteNotAgree(false);
                }
            } else {
                this.deleteAgree(false);
                this.deleteNotAgree(false);
            }
        }
    }
    deleteVote(){
        this.votesService.delete(this.voteId).subscribe(
            data => {
                this.router.navigate(['/votes'])
            },
            error => {
                console.log(error);
            }
        )
    }
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

    deleteAgree(voting:boolean):any{
        this.loading = true;  
        this.votesService.checkAgree(this.voteId, this.userId).subscribe(
            data => {
                if (data !== null) {
                    this.votesService.deleteAgree(data.id, this.voteId).subscribe(
                        data => {
                            this.loading = false; 
                            this.button.agree = false;    
                            voting ? this.notAgree() : false;
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
                this.count.agree = data.length;
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
    deleteNotAgree(voting:boolean):any{
        this.loading = true;
        this.votesService.checkNotAgree(this.voteId, this.userId).subscribe(
            data => {
                if (data !== null) {
                    this.votesService.deleteNotAgree(data.id, this.voteId).subscribe(
                        data => {
                            this.button.notAgree = false;
                            this.loading = false;
                            voting ? this.agree() : false;
                        },
                        error => {
                            this.button.notAgree = true;
                            this.loading = false;
                        }
                    )
                }
            }
        )
    }
    getAllNotAgree() {
        this.votesService.getAllNotAgree(this.voteId).subscribe(
            data => {
                this.count.notAgree = data.length;
            }
        )
    }
}