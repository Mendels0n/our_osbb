import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../../services/index';
import { User } from '../../../models/user.model';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.scss']
})
export class ProfileComponent implements OnInit {
    userId: string;
    user: User;
    profileId: string;
    showCreatedMessages: any;
    sendUser: any = {};
    comments: any;
    newsfeeds: any;
    editUser: boolean = true;
    form:FormGroup;

    constructor(private userService: UserService, private route: ActivatedRoute, private fb:FormBuilder) {
        this.userId = localStorage.getItem('user_id');
        this.profileId = this.route.snapshot.params['id'];

    }

    ngOnInit() {
        this.profileId ? this.loadUser(this.profileId) : this.loadUser(this.userId);
        this.profileId ? this.loadContent(this.profileId) : this.loadContent(this.userId);

    }

    loadUser(id: string) {
        this.userService.userById(id).subscribe(
            (user: User) => {
                this.user = user;
                this.sendUser.id = user.id;
            }
        )
    }
    edit(close:boolean = false, params?: boolean) {
        if (!params) {
            this.editUser = false;
            this.form = this.fb.group({
                fistName: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
                lastName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
                room: ['', Validators.compose([Validators.required,Validators.pattern("^(0|[1-9][0-9]*)$")])],
            });
        } else if (params) {
            this.userService.editUser(this.userId, this.user).subscribe(
                (data: any) => {
                    this.user = data;
                    this.editUser = true;
                }
            )
        } 
         if (close){
            this.editUser = true;            
            this.profileId ? this.loadUser(this.profileId) : this.loadUser(this.userId);
        }
    }
    loadContent(id: string) {
        this.userService.getAllNewsfeedUser(id).subscribe(
            data => {
                this.newsfeeds = data;
            }
        )
        this.userService.getAllСommentsUser(id).subscribe(
            data => {
                this.comments = data;
            }
        )
    }
    showCreatedMessage(event: any) {
        this.showCreatedMessages = event;
    }
}