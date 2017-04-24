import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { headers } from './headers';


@Injectable()
export class CommentsService {
    url:string;
    constructor(private http:Http){
        this.url = 'https://our-osbb.herokuapp.com';
    }
    getComments(id:number){
        return this.http.get(`${this.url}/api/newsfeed/${id}/comments`, headers())
        .map((res:Response) => res.json() )
        .catch((error: any) => Observable.throw(error.json().errors || 'Server error'))
    }
    create(model: any) {
        let data = new URLSearchParams();
        for (let key in model) {
            data.append(key, model[key])
        }
        return this.http.post(`${this.url}/api/comment`, data, headers())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().errors || 'Server error'))
    }
}