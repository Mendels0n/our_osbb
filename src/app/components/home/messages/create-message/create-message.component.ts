import { Component, OnInit, Input, Output, EventEmitter,ViewEncapsulation} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { MessagesService, UserService} from '../../../../services/index';
import { Messages } from '../../../../models/messages.model';

class newUser{
    constructor(public name:string,public id:string){

    }
}

@Component({
    selector: 'create-message',
    templateUrl: 'create-message.component.html',
    styleUrls: ['create-message.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateMessageComponent implements OnInit {
    model: Messages;
    form: FormGroup;
    userId: string;
    @Input() showCreateMessage: any;
    @Input() message:any;
    @Output() hideCreateMessage = new EventEmitter < any > ();
    @Output() addMessage = new EventEmitter < any > ();
    userList: any = [];
    newUser: newUser;
    models:any;
    error:string;
    constructor(private messagesService: MessagesService, private userService: UserService, private fb: FormBuilder) {
        this.model = new Messages;
        this.userId = localStorage.getItem('user_id');
        
    }


    ngOnInit() {
        this.loadUser();
        if (this.message.sender_id) {
            this.form = this.fb.group({
                title: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
                content: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
            });
            this.model.recipient_id = this.message.sender_id;
            this.model.title = this.message.title;
        } else if(!this.message) {
            this.form = this.fb.group({
                recipientId: ['', Validators.compose([Validators.required])],
                title: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
                content: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
            });
            this.model.recipient_id = this.models.id;
        }else {
            this.form = this.fb.group({
                title: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
                content: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
            });
            this.model.recipient_id = this.message.id;
        }
    }
    create() {
        this.model.sender_id = this.userId;
        this.messagesService.createMessages(this.model).subscribe(
            data => {
                this.addMessage.emit(data);
                this.close();
            },
            error => {
                if(error == 'recipient_id is missing'){
                    this.error = 'Житель не найден';
                }
            }
        )
    }
    loadUser() {
        this.userService.getAllUsers().subscribe(
            data => {
                data.forEach((element: any) => {
                    if (this.userId != element.id) {
                        let user: any = {};
                        user.id = element.id;
                        user.name = `${element.first_name} ${element.last_name}`;
                        this.userList.push(user);
                    }
                });
            }
        )
    }
    close() {
        console.log('users', this.userList)
        this.hideCreateMessage.emit(false);
    }
}