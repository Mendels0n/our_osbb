import { Component, OnInit } from '@angular/core';
import { UnregisteretService } from '../../../services/unregisteret.service';

@Component({
    selector: 'users-list',
    templateUrl: 'user-list.component.html',
    // styleUrls: ['./name.component.css']
})
export class UserListComponent implements OnInit {
    users:any;
    constructor(private service: UnregisteretService) {}

    ngOnInit() {
        this.service.getAll().subscribe(
            data => {
                console.log(data);
                this.users = data;
            })
    }
}