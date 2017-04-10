import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UnregisteretService {
    url: string;
    constructor(private http: Http) {
        this.url = 'https://our-osbb.herokuapp.com';
    }

    getAll() {
        return this.http.get(`${this.url}/api/unregisteret`, this.headers())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().errors || 'Server error'));
    }
    aprove(id: any) {
        let data = new URLSearchParams();
        data.append('approved', 'true');
        return this.http.patch(`${this.url}/api/unregisteret/${id}/aprove_user`,data, this.headers())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().errors || 'Server error'));
    }
    declined(id: any, string: string = "Reason not specified") {
        return this.http.delete(`${this.url}/api/unregisteret/${id}/declined_user?reason=${string}`,this.headers())
            .map((res: Response) => res.json())
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