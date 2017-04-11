import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommentsService {
    url:string;
    constructor(private http:Http){
        this.url = 'https://our-osbb.herokuapp.com';
    }
    getComments(id:number){
        return this.http.get(`${this.url}/api/newsfeed/${id}/comments`, this.headers())
        .map((res:Response) => res.json() )
        .catch((error: any) => Observable.throw(error.json().errors || 'Server error'))
    }
    private headers() {
        let token = JSON.parse(localStorage.getItem('token'));
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        
        if (token) {
            headers.append('X-Access-Token', token);
        }
        return new RequestOptions({
            headers
        });
    }
}