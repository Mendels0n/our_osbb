import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Observable';



@Injectable()
export class OsbbService {
    url:string;
    constructor(private http:Http) {
        this.url = 'api/osbb';
    }
    getOsbb() {
        return this.http.get(this.url)
            .map(res => res.json().data);
    }
    getOsbbb(id:number){
        return this.http.get(`${this.url}/${id}`)
            .map(res => res.json().data);
    }
    createOsbb(osbb:any){
        return this.http.post(`${this.url}`, osbb)
            .map(res => res.json().data);
    }
}