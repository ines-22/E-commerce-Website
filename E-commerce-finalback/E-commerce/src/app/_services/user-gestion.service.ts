import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../gestion user/user';

@Injectable({
  providedIn: 'root'
})
export class UserGestionService {

  private baseUrl = 'http://localhost:8090/api/gestion_user';

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${id}`);
  }

  createUser(user: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/adduser`, user);
  }

  updateUser(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/updateuser/${id}`, value);
  }

  deleteUser(id: number): Observable<any> {
    console.log(id);
    return this.http.delete(`${this.baseUrl}/deleteuser/${id}`, { responseType: 'text' });
  }

  getUserList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }


}
