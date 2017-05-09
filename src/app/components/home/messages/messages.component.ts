import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Messages } from '../../../models/messages.model';
import { MessagesService, UserService} from '../../../services/index';


@Component({
    selector: 'messages',
    templateUrl: 'messages.component.html',
    styleUrls: ['messages.component.scss']
})
export class MessagesComponent implements OnInit {
    form:FormGroup;
    messages:Messages;
    userId:string;
    showMessage:Messages;
    sended:Messages;
    recived:Messages;
    show:string;
    loading:boolean;
    
    constructor(private fb:FormBuilder, private messagesService:MessagesService, private userService:UserService) { 
        this.messages = new Messages();
        this.userId = localStorage.getItem('user_id');
        this.form = this.fb.group({
            senderId:['', Validators.compose([Validators.required])],
            recipientId:['', Validators.compose([Validators.required])],
            title: ['', Validators.compose([Validators.required,Validators.minLength(3)])],
            content: ['',Validators.compose([Validators.required,Validators.minLength(5 )])]
        });
    }

    ngOnInit() { 
     this.loadMessages();
    }
    create(){
        this.messagesService.createMessages(this.messages).subscribe(
            data => {
                this.sended.push(data);
            }
        )
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
                    this.sended = data;
                }
            )
            this.messagesService.userRecivedMessages(this.userId).subscribe(
                data => {
                    this.recived = data;
                    this.showMessages();
                }
            )
    }
    deleteMessages(event:Event){
        let index = this.showMessage.indexOf(event);
        this.showMessage.splice(index,1);
    }
}