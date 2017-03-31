import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers} from '@angular/http';
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
    return this.http.post(`${this.url}/api/osbbs`, JSON.stringify({osbb:model}), this.headers())
    .map((res : Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  private headers () {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new RequestOptions({ headers });
  }
}
