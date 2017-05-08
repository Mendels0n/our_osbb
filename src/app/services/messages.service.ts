import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { headers } from './headers';
import { API_URL } from './config';
import { Messages } from '../models/messages.model';
@Injectable()
export class MessagesService {
    url:string;
    constructor(private http:Http){
        this.url = API_URL;
    }
    createMessages(model: Messages) {
        let data = new URLSearchParams();
        for (let key in model) {
            data.append(key, model[key])
        }
        return this.http.post(`${this.url}/api/messages`, data, headers())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
    }
    showMessages(id:string){
        return this.http.get(`${this.url}/api/messages/${id}`, headers())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
    }
    changeReadStatus(id:string, status:string){
        let data = new URLSearchParams();
        data.append('read_status',status)
        return this.http.patch(`${this.url}/api/messages/${id}`, data, headers())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
    }
    deleteMessages(id:string){
        return this.http.patch(`${this.url}/api/messages/${id}/deleted`, headers())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
    }
}