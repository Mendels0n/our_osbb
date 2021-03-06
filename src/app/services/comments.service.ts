import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { headers } from './headers';
import { API_URL } from './config';



@Injectable()
export class CommentsService {
    url:string;
    constructor(private http:Http){
        this.url = API_URL;
    }
    getComments(id:number){
        return this.http.get(`${this.url}/api/newsfeeds/${id}/comments`, headers())
        .map((res:Response) => res.json() )
        .catch((error: any) => Observable.throw(error.json().errors || 'Server error'))
    }
    create(model: any) {
        let data = new URLSearchParams();
        for (let key in model) {
            data.append(key, model[key])
        }
        return this.http.post(`${this.url}/api/comments`, data, headers())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().errors || 'Server error'))
    }
    edit(id:any,model:any){
        let data = new URLSearchParams();
        for (let key in model) {
            data.append(key, model[key])
        }
        return this.http.patch(`${this.url}/api/comments/${id}`, data, headers())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().errors || 'Server error'));
    }
    delete(id:any){
        return this.http.delete(`${this.url}/api/comments/${id}`, headers())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().errors || 'Server error'));
    }
}