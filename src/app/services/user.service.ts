import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";

@Injectable()
export class UserService {
    url:string;
    constructor(private http: Http) {
        this.url = 'https://our-osbb.herokuapp.com';
    }

    signIn(login:string,password:string){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(`${this.url}/api/auth/login_user`,
            JSON.stringify({ login_user :{login, password} }),{headers:headers})
            .map((response: Response) => {
                let token = response.json().token;
                localStorage.setItem('token', JSON.stringify(token));
            });
    }
}