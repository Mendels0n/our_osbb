import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Messages } from '../../../models/messages.model';
import { MessagesService, UserService} from '../../../services/index';


@Component({
    selector: 'messages',
    templateUrl: 'messages.component.html',
    styleUrls: ['messages.component.scss']
})
export class MessagesComponent implements OnInit {
    messages:Messages;
    userId:string;
    showMessage:Array<Messages> = [];
    sended:Array<Messages> = [];
    recived:Array<Messages> = [];
    show:string;
    loading:boolean;
    showCreatedMessages:any;
    
    constructor( private messagesService:MessagesService, private userService:UserService) { 
        this.messages = new Messages();
        this.userId = localStorage.getItem('user_id');
    }

    ngOnInit() { 
     this.loadMessages();
    }
    
    showMessages(params:string = 'recived'){
        this.show = params;
        if(this.show == 'recived'){
            this.showMessage = this.recived;
        }else{
            this.showMessage = this.sended;
        }
    }
    loadMessages() {
            
            this.messagesService.userSendedMessages(this.userId).subscribe(
                data => {
                    data.forEach((e:Messages) => {
                        (e.deleted_by_sender != true) ? this.sended.push(e): false;
                    });
                }
            )
            this.messagesService.userRecivedMessages(this.userId).subscribe(
                data => {
                    data.forEach((e:Messages) => {
                        (e.deleted_by_recipient != true) ? this.recived.push(e): false;
                    });
                    this.showMessages();
                }
            )
    }
    deleteMessages(event:any){
        let index = this.showMessage.indexOf(event);
        this.showMessage.splice(index,1);
    }
    showCreatedMessage(event:any){
        this.showCreatedMessages = event;
    }
    addMessage(event:Event){
        this.sended = [];
        this.recived = [];
        this.loadMessages();
    }
}