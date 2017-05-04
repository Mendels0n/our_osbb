import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { headers } from './headers';
import { API_URL } from './config';

import { Votes } from '../models/votes.model';

@Injectable()
export class VotesService {
    url: string;
    constructor(private http: Http ){
         this.url = API_URL;
    }
    //All
    getAllVotes() {
        return this.http.get(`${this.url}/api/votings`, headers())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getVotes(id:string){
        return this.http.get(`${this.url}/api/votings/${id}`, headers())
            .map((res:Response)=> res.json())
            .catch((error:any)=> Observable.throw(error.json().error || 'Server error'));
    }
    create(model:Votes) {
        let data = new URLSearchParams();
        for (let key in model) {
            data.append(key, model[key])
        }
        return this.http.post(`${this.url}/api/votings`, data, headers())
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    delete(id:string){
        return this.http.delete(`${this.url}/api/votings/${id}`, headers())
            .map((res:Response)=> res.json())
            .catch((error:any)=> Observable.throw(error.json().error || 'Server error'));
    }
    edit(id:string,model:Votes){
        let data = new URLSearchParams();
        for (let key in model) {
            data.append(key, model[key])
        }
        return this.http.patch(`${this.url}/api/votings/${id}`, data, headers())
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    //Agree
    agree(id:string, voteId:string, room:string){
        let data = new URLSearchParams;
        data.append('room', room);
        data.append('voting_id', voteId);
        return this.http.post(`${this.url}/api/votings/${id}/agree`, data, headers())
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    deleteAgree(id:string ,voteId:string){
        return this.http.delete(`${this.url}/api/votings/${voteId}/agree/${id}`, headers())
            .map((res:Response)=> res.json())
            .catch((error:any)=> Observable.throw(error.json().error || 'Server error'));
    }
    checkAgree(voteId:string, userId:string){
        return this.http.get(`${this.url}/api/votings/${voteId}/user/${userId}/agree`, headers())
            .map((res:Response)=> res.json())
            .catch((error:any)=> Observable.throw(error.json().error || 'Server error'));
    }
    getAllAgree(id:string){
        return this.http.get(`${this.url}/api/votings/${id}/agree`, headers())
            .map((res:Response)=> res.json())
            .catch((error:any)=> Observable.throw(error.json().error || 'Server error'));
    }
    //Not agree
    notAgree(id:string, voteId:string, room:string){
        let data = new URLSearchParams;
        data.append('room', room);
        data.append('voting_id', voteId);
        return this.http.post(`${this.url}/api/votings/${id}/not_agree`, data, headers())
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    deleteNotAgree(id:string ,voteId:string){
        return this.http.delete(`${this.url}/api/votings/${voteId}/not_agree/${id}`, headers())
            .map((res:Response)=> res.json())
            .catch((error:any)=> Observable.throw(error.json().error || 'Server error'));
    }
    checkNotAgree(voteId:string, userId:string){
        return this.http.get(`${this.url}/api/votings/${voteId}/user/${userId}/not_agree`, headers())
            .map((res:Response)=> res.json())
            .catch((error:any)=> Observable.throw(error.json().error || 'Server error'));
    }
    getAllNotAgree(id:string){
        return this.http.get(`${this.url}/api/votings/${id}/not_agree`, headers())
            .map((res:Response)=> res.json())
            .catch((error:any)=> Observable.throw(error.json().error || 'Server error'));
    }
    
}