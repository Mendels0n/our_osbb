import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { OSBB } from '../models/osbb.model'

@Injectable()
export class OsbbService {
  url : string;
  constructor(private http:Http) {
    this.url = 'https://our-osbb.herokuapp.com';
  }
  getAll() {
    return this.http.get(`${this.url}/api/osbbs`)
    .map((res : Response) => res.json());
  }
  createOsbb(model:OSBB){
    let data = new URLSearchParams();
    for(let key in model){
      data.append(key,model[key])
    }
    return this.http.post(`${this.url}/api/osbbs`, data, this.headers())
    .map((res : Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().errors || 'Server error'));
  }
  private headers () {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return new RequestOptions({ headers });
  }
}
