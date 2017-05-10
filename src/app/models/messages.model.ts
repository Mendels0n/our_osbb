export class Messages {
    sender_id:string;
    recipient_id:string;
    title:string;
    body:string;
    deleted_by_sender?:boolean;
    deleted_by_recipient?:boolean;
    [propName: string]: any;
}