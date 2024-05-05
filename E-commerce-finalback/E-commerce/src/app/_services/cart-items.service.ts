import { Injectable } from '@angular/core';
import { CartItem } from '../gestion cart/CartItem';
import { Observable } from 'rxjs';
import { User } from '../gestion user/user';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class CartItemsService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8090/api/gestion_cart';

  addToUserCart(userId: number, productId: number): Observable<User> {
    return this.http.post<User>(
      `${this.baseUrl}/users/${userId}/cart/add/${productId}`,
      {}
    );
  }

  getUserCart(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.baseUrl}/users/${userId}/cart`);
  }

  updateUserCartItem(
    userId: number,
    productId: number,
    quantity: number
  ): Observable<User> {
    return this.http.put<User>(
      `${this.baseUrl}/users/${userId}/cart/update/${productId}`,
      {
        quantity,
      }
    );
  }

  deleteUserCartItem(userId: number, productId: number): Observable<any> {
    console.log(userId);
    console.log(productId);
    return this.http.delete(
      `${this.baseUrl}}/users/${userId}/cart/remove/${productId}`
    );
  }
}
