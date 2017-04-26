import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { CommentsService } from '../../../../../../services/comments.service';

@Component({
    selector: 'comment',
    templateUrl: 'comment.component.html',
    styleUrls: ['comment.component.scss']
})
export class CommentComponent implements OnInit {
    @Input() comment: any;
    @Output() deleteComment = new EventEmitter<any>();
    editMode: boolean;
    userId: string;
    role:any;
    mainRole:string;

    constructor(private commentsService: CommentsService) {
        this.userId = localStorage.getItem('user_id');
        this.mainRole = "main";
    }

    ngOnInit() {
        this.loadRole();
    }
    delete() {
        this.commentsService.delete(this.comment.id)
            .subscribe(
                data => {
                    this.deleteComment.emit(this.comment);
                },
                error => {
                }
            )
    }
    loadRole(){
        this.role = localStorage.getItem('role');
        this.role = this.role.replace(/"/g,'');
    }
    edit(value: boolean) {
        this.editMode = value;
        if (!value) {
            this.commentsService.edit(this.comment.id, this.comment)
                .subscribe(
                    data => {
                        this.comment = data
                    },
                    error => {
                        this.editMode = true;
                    }
                )
        }
    }
}