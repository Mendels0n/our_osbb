import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { headers } from './headers';


@Injectable()
export class UnregisteretService {
    url: string;
    constructor(private http: Http) {
        this.url = 'https://our-osbb.herokuapp.com';
    }

    getAll() {
        return this.http.get(`${this.url}/api/unregisteret`, headers())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().errors || 'Server error'));
    }
    aprove(id: any) {
        let data = new URLSearchParams();
        data.append('approved', 'true');
        return this.http.patch(`${this.url}/api/unregisteret/${id}/aprove_user`,data, headers())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().errors || 'Server error'));
    }
    declined(id: any, string: string = "Reason not specified") {
        return this.http.delete(`${this.url}/api/unregisteret/${id}/declined_user?reason=${string}`, headers())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().errors || 'Server error'))
    }
}