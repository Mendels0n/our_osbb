import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/index';
import { User } from '../../../models/user.model';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.scss']
})
export class ProfileComponent implements OnInit {
    userId:string;
    user:User;
    profileId:string;
    showCreatedMessages:any;
        
    constructor(private userService:UserService, private route:ActivatedRoute) { 
        this.userId = localStorage.getItem('user_id');
        this.profileId = this.route.snapshot.params['id'];

    }

    ngOnInit() { 
       this.profileId ? this.loadUser(this.profileId) : this.loadUser(this.userId);
    }

    loadUser(id:string){
        this.userService.userById(id).subscribe(
            (user:User) => {
                this.user = user;
            }
        )
    }
    showCreatedMessage(event:any){
        this.showCreatedMessages = event;
    }
}