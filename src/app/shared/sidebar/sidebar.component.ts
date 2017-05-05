import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    role:string = 'user';
    mainRole:string;
    constructor() {
       this.loadRole();
       this.mainRole = "main";
     }

    ngOnInit() { 
    }
    loadRole(){
        this.role = localStorage.getItem('role');
        this.role = this.role.replace(/"/g,'');
    }
}