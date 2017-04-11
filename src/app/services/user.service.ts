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

  signIn(login: string, password: string) {
    let data = new URLSearchParams();
    data.append('login', login);
    data.append('password', password);
    return this.http.post(`${this.url}/api/users/login_user`, data, this.headers())
      .map((response: Response) => {
        let token = response.json().key.access_token;
        let id = response.json().key.user_id;
        let osbbId = response.json().osbb_id;
        let role = response.json().role;
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('user_id', JSON.stringify(id));
        localStorage.setItem('osbb_id', JSON.stringify(osbbId));
        localStorage.setItem('role', JSON.stringify(role));
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  create (model:User) {
    console.log(model);
    let data = new URLSearchParams();
    for(let key in model){
      data.append(key,model[key])
    }
    return this.http.post(`${this.url}/api/users`,data, this.headers())
    .map((response:Response) => response.json())
    .catch((error:any) => Observable.throw(error.json().errors || 'Server error'));
  }
  userById(id:any){
    return this.http.get(`${this.url}/api/users/${id}`, this.headers())
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().errors || 'Server error'));
  }
  checkEmeil(emeil:string){
    let data = new URLSearchParams();
    data.append('email',emeil);
    return this.http.get(`${this.url}/api/users/check_email`, {search:data})
    .debounceTime(900)
    .map((response:Response) => response.json())
  }
  checkToken(){
    return !!localStorage.getItem('token');
  }
  private headers() {
        let token = JSON.parse(localStorage.getItem('token'));
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        
        if (token) {
            headers.append('X-Access-Token', token);
        }
        return new RequestOptions({
            headers
        });
    }
}
