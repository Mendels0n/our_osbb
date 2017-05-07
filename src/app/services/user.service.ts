import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { headers } from './headers';
import { API_URL } from './config';

import { User } from '../models/user.model';

@Injectable()
export class UserService {
  url:string;
  constructor (private http: Http) {
    this.url = API_URL;  
  }
  checkToken(): boolean {
    return  !!localStorage.getItem('token');
  }
  signIn(login: string, password: string) {
    let data = new URLSearchParams();
    data.append('email', login);
    data.append('password', password);
    return this.http.post(`${this.url}/api/logins`, data, headers())
      .map((response: Response) => {
        let res = response.json();
        let headers = response.headers;
        let token = headers.get('X-Access-Token');
        let osbbId = headers.get('X-Current-Osbb');
        let id = res.user_id;
        let role = res.role;
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('user_id', JSON.stringify(id));
        localStorage.setItem('osbb_id', JSON.stringify(osbbId));
        localStorage.setItem('role', JSON.stringify(role));
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  create (model:User) {
    let data = new URLSearchParams();
    for(let key in model){
      data.append(key,model[key])
    }
    return this.http.post(`${this.url}/api/signups`,data, headers())
    .map((response:Response) => response.json())
    .catch((error:any) => Observable.throw(error.json().errors || 'Server error'));
  }
  userById(id:any){
    return this.http.get(`${this.url}/api/users/${id}`, headers())
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().errors || 'Server error'));
  }
  editUser(model:User){
    let data = new URLSearchParams();
    for(let key in model){
      data.append(key,model[key])
    }
  }
  getAllUsers(){
    return this.http.get(`${this.url}/api/users/`, headers())
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().errors || 'Server error'));
  }
  checkEmeil(emeil:string){
    let data = new URLSearchParams();
    data.append('email',emeil);
    return this.http.get(`${this.url}/api/logins/check_email`, {search:data})
    .debounceTime(900)
    .map((response:Response) => response.json())
  }
  
}
