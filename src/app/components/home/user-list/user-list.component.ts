import { Component, OnInit } from '@angular/core';
import { UnregisteretService } from '../../../services/unregisteret.service';

@Component({
    selector: 'users-list',
    templateUrl: 'user-list.component.html',
    styleUrls: ['user-list.component.scss']
})
export class UserListComponent implements OnInit {
    users:any;
    reason:string;
    constructor(private service: UnregisteretService) {}

    ngOnInit() {
        this.loadUser();
    }
    loadUser(){
        this.service.getAll().subscribe(
            data => {
                this.users = data;
            })
    }
    aprove(id:any){
        this.service.aprove(id).subscribe(
            data =>{
                console.log(data);
            }
        )
    }
    declined(id:any){
        this.service.declined(id,this.reason).subscribe(
            data => {
                console.log(data);
            }
        )
    }
}