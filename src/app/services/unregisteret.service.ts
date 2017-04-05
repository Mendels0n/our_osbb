import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UnregisteretService {
    url: string;
    constructor(private http: Http) {
        this.url = 'https://our-osbb.herokuapp.com';
    }

    getAll(){
        return this.http.get(`${this.url}/api/unregisteret`, this.headers())
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().errors || 'Server error'));
    }

    private headers() {
        let token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            let headers = new Headers({ 'X-Access-Token' : token });
            return new RequestOptions({ headers: headers });
        }

}
}