import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from "@angular/http";

export function headers() {
    let token = JSON.parse(localStorage.getItem('token'));
    let osbbId = JSON.parse(localStorage.getItem('osbb_id'));
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    if (token) {
        headers.append('X-Access-Token', token);
        headers.append('X-Current-Osbb', osbbId);
    }
    return new RequestOptions({
        headers
    });
}