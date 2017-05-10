import { Component, OnInit,ViewChild } from '@angular/core';
import { UnregisteretService, UserService } from '../../../services/index';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'users-list',
    templateUrl: 'user-list.component.html',
    styleUrls: ['user-list.component.scss']
})
export class UserListComponent implements OnInit {
    newUsers:any;
    users:any;  
    reason:string;
    role:string;
    show:string = "all";
    mainRole = "main";

    @ViewChild('staticModal') public staticModal:ModalDirective;
    constructor(private service: UnregisteretService, private userService:UserService) {}

    ngOnInit() {
        this.loadUser();
        this.loadRole();
    }
    loadRole(){
        this.role = localStorage.getItem('role');
        this.role = this.role.replace(/"/g,'');
    }
    loadUser(){
        this.service.getAll().subscribe(
            data => {
                this.newUsers = data;
            })
        this.userService.getAllUsers().subscribe(
            data =>{
                this.users = data;
            }
        )
    }
    aprove(id:any){
        this.service.aprove(id).subscribe(
            data =>{
               this.loadUser();                
            }
        )
    }
    declined(id:any){
        this.service.declined(id,this.reason).subscribe(
            data => {
               this.staticModal.hide();
               this.loadUser();
            }
        )
    }
}