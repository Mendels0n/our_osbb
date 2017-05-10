import { Component, OnInit } from '@angular/core';
import { NewsfeedService } from '../../../services/newsfeed.service'; 
import { UserService } from '../../../services/user.service';
import { PagerService } from '../../../services/pager.service';
import { SortForDatePipe } from '../../../pipes/sort-for-date.pipe';
import { ReversePipe } from '../../../pipes/reverse.pipe';
import { Router } from '@angular/router';
import * as _ from 'underscore';

@Component({
    selector: 'newsfeed',
    templateUrl: 'newsfeed.component.html',
    styleUrls: ['newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {
    news: any;
    comments: any;
    role: string = 'user'; 
    mainRole: string;
    term:string;
    private allItems: any[];
    pager: any = {};
    pagedItems: any[];
    sortPipe:SortForDatePipe;
    reversePipe:ReversePipe;

    constructor(private newsfeedService: NewsfeedService, private userService: UserService, private router: Router, private pagerService:PagerService) {
        this.mainRole = "main";
        this.sortPipe = new SortForDatePipe();
        this.reversePipe = new ReversePipe();
        this.loadRole();
        
    }

    ngOnInit() {
        this.loadNews();
    }
    loadRole() {
        this.role = localStorage.getItem('role');
        this.role = this.role.replace(/"/g, '');
    }
    loadNews() {
        this.newsfeedService.allNews().subscribe(
            news => {
                this.news = news;
                this.sorting('all');
            },
            error => {
                if (error == 'Unauthorized. Invalid or expired token.') {
                    localStorage.clear();
                    this.router.navigate(['/login']);
                }
            }
        )
    }

    sorting(params:string){
        this.term = params;
        let data = this.sortPipe.transform(this.news,params);
        this.allItems = this.reversePipe.transform(data);
        this.setPage(1);
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.allItems.length, page);
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}