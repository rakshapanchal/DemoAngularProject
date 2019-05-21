import { Injectable } from '@angular/core';
import { URL } from './../app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  constructor(private http: HttpClient) { }
  getHeaderWithToken() {
    let headers = new HttpHeaders()
    headers = headers.set('Content-Type', 'application/json')

    return headers;
}
  post(signup) {
    
    return this.http.post(URL + 'user/register', signup, { headers: this.getHeaderWithToken() })
    
  }


}
