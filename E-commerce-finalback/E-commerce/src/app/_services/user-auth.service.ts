import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8090/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      email,
      password
    }, httpOptions);
  }

  register(email: string, password: string, mobile: number, first_name: string, family_name: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      email, password, mobile,
      first_name,
      family_name
    }, httpOptions);
  }

  forgotpassword(email: string): Observable<any> {
    return this.http.post(AUTH_API + 'forgot-password', { email }, httpOptions);
  }

  resetpassword(token: string, password: string): Observable<any> {
    return this.http.put(AUTH_API + 'reset-password', { token, password }, httpOptions);
  }

}
