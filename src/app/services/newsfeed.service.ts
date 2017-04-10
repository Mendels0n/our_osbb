import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NewsfeedService {
    url:string;
    constructor(private http:Http){
        this.url = 'https://our-osbb.herokuapp.com';
    }
    allNews(){
        return this.http.get(`${this.url}/api/newsfeed`, this.headers())
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