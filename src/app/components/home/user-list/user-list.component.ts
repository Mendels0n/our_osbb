import { Component, OnInit,ViewChild } from '@angular/core';
import { UnregisteretService } from '../../../services/unregisteret.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'users-list',
    templateUrl: 'user-list.component.html',
    styleUrls: ['user-list.component.scss']
})
export class UserListComponent implements OnInit {
    users:any;
    reason:string;
    @ViewChild('staticModal') public staticModal:ModalDirective;
    constructor(private service: UnregisteretService) {}

    ngOnInit() {
        this.loadUser();
    }
    loadUser(){
        this.service.getAll().subscribe(
            data => {
                console.log(data);
                this.users = data;
            })
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