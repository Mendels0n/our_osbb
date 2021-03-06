import { Component, OnInit, Input, Output, EventEmitter, HostListener} from '@angular/core';
import { MessagesService } from '../../../../services/index';   

@Component({
    selector: 'message',
    templateUrl: 'message.component.html',
    styleUrls: ['message.component.scss']
})
export class MessageComponent implements OnInit {
    @Input() message: any;
    @Input() show:string;
    @Output() delMessage = new EventEmitter<any>();
    @Output() addMessage = new EventEmitter<any>();
    userId = localStorage.getItem('user_id');
    deletedMessage:boolean;
    showCreatedMessages:any;
    fullMessage:boolean;

    constructor(private messageService:MessagesService) {
        this.fullMessage = true;
     }

    ngOnInit() {
        
     }
    showFullMessage(){
        this.changeReadStatus();
        this.fullMessage = !this.fullMessage;
    }
    changeReadStatus(){
        if(this.show != 'sended')
        this.messageService.changeReadStatus(this.message.id, 'true').subscribe(
            data => {
                this.message = data;
            },
            error => {
            }
        )
    }
    deleteMessage() {
        if (this.show == 'sended') {
            this.messageService.deleteSenderMessages(this.message.id,'true').subscribe(
                data => {
                    this.delMessage.emit(this.message);
                }
            )
        } else {
            this.messageService.deleteRecivedMessages(this.message.id,'true').subscribe(
                data => {
                    this.delMessage.emit(this.message)
                }
            )
        }

        // this.delMessage.emit(this.message);
    }
    showCreatedMessage(event:any){
        this.showCreatedMessages = event;
    }
}