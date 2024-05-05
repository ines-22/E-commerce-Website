import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../gestion produit/product';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8090/api/gestion_produit';
  getproducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`, httpOptions);
  }
  getproduct(id: Number): Observable<any> {
    return this.http.get(`${this.baseUrl}/product/${id}`, httpOptions);
  }
  addproduct(product: Product) {
    return this.http.post<Product>(`${this.baseUrl}/addproduct`, product);
  }
  deleteproduct(id: number) {
    return this.http.delete<Product>(`${this.baseUrl}/deleteproduct/${id}`);
  }
  updateproduct(id: number, product: Product) {
    return this.http.put<Product>(
      `${this.baseUrl}/updateproduct/${id}`,
      product
    );
  }
}
