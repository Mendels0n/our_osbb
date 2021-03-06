import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { headers } from './headers';
import { API_URL } from './config';


import { OSBB } from '../models/osbb.model'

@Injectable()
export class OsbbService {
  url : string;
  constructor(private http:Http) {
    this.url = API_URL;
  }
  getAll() {
    return this.http.get(`${this.url}/api/osbbs`)
    .map((res : Response) => res.json());
  }
  getOsbb(id:any){
    return this.http.get(`${this.url}/api/osbbs/${id}`)
    .map((res : Response) => res.json());
  }
  createOsbb(model:OSBB){
    let data = new URLSearchParams();
    for(let key in model){
      data.append(key,model[key])
    }
    return this.http.post(`${this.url}/api/osbbs`, data, headers())
    .map((res : Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().errors || 'Server error'));
  }
}
