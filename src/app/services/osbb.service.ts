import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Observable';

let OSBB = [
    { id: 1, name: 'ул. Комарова 87', street:'123' },
    { id: 2, name: 'пр. Комарова 25', street:'123' },
    { id: 3, name: 'ул. Комарова 232', street:'123' },
    { id: 4, name: 'ул. Комарова 232', street:'123' },
    { id: 5, name: 'ул. Комарова 232', street:'123' },
    { id: 6, name: 'ул. Комарова 232', street:'123' },
    { id: 7, name: 'ул. Комарова 232', street:'123' },
    { id: 8, name: 'ул. Комарова 232', street:'123' },
    { id: 9, name: 'ул. Комарова 232', street:'123' },
    { id: 10, name: 'ул. Комарова 232', street:'123' },
    { id: 11, name: 'ул. Комарова 232', street:'123' }
];
let promise =  Promise.resolve(OSBB);
@Injectable()
export class OsbbService {
    constructor(private http:Http) {

    }
    getAll() {
        return promise;
    }
    getOsbb(id:number){
        return promise
            .then(osbb => osbb.find(x => x.id == id));
    }
    createOsbb(osbb:any){
        console.log(osbb);
    }
}