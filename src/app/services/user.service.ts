import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user.model';


@Injectable()
export class UserService {
  url:string;
  constructor (private http: Http) {
    this.url = 'https://our-osbb.herokuapp.com';
  }

  signIn (login:string,password:string) {
    let data = new URLSearchParams();
    data.append('login', login);
    data.append('password', password);
    return this.http.post(`${this.url}/api/users/login_user`, data,this.headers())
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
    let data = new URLSearchParams();
    for(let key in model){
      data.append(key,model[key])
    }
    return this.http.post(`${this.url}/api/users`,data, this.headers())
    .map((response:Response) => {response.json()})
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  checkToken(){
    return !!localStorage.getItem('token');
  }
  private headers () {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return new RequestOptions({ headers });
  }
}
