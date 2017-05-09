import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { headers } from './headers';
import { API_URL } from './config';


@Injectable()
export class NewsfeedService {
    url: string;
    constructor(private http: Http, ) {
        this.url = API_URL;
    }
    allNews() {
        return this.http.get(`${this.url}/api/newsfeeds`, headers())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
    }
    getNews(id: number) {
        return this.http.get(`${this.url}/api/newsfeeds/${id}`, headers())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().errors || 'Server error'))
    }
    deleteNews(id: any) {
        return this.http.delete(`${this.url}/api/newsfeeds/${id}`, headers())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().errors || 'Server error'))
    }
    editNews(id: any, model: any) {
        let data = new URLSearchParams();
        for (let key in model) {
            data.append(key, model[key])
        }
        return this.http.patch(`${this.url}/api/newsfeeds/${id}`, data, headers())
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().errors || 'Server error'));
    }
    createNews(model: any) {
        let data = new URLSearchParams();
        for (let key in model) {
            data.append(key, model[key])
        }
        return this.http.post(`${this.url}/api/newsfeeds`, data, headers())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().errors || 'Server error'))
    }

}