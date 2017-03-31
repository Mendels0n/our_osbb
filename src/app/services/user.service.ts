import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user.model';


@Injectable()
export class UserService {
  url:string;
  constructor (private http: Http) {
    this.url = 'https://our-osbb.herokuapp.com';
  }

  signIn (login:string,password:string) {
    return this.http.post(`${this.url}/api/users/login_user`,JSON.stringify({ login_user :{login, password} }),this.headers())
    .map((response: Response) => {
      let token = response.json().access_token;
      let id = response.json().user_id;
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('user_id', JSON.stringify(id));
    })
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  create (model:User) {
    console.log(model);
    return this.http.post(`${this.url}/api/users`, JSON.stringify({ user:model}), this.headers())
    .map((response:Response) => {response.json()})
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  private headers () {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new RequestOptions({ headers });
  }
}
