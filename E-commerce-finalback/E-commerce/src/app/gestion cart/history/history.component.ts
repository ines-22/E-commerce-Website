import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartItem } from '../CartItem';
import { User } from '../../gestion user/user';
import { CartItemsService } from '../../_services/cart-items.service';

import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TokenStorageService } from '../../_services/token-storage.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule,
    FontAwesomeModule, HttpClientModule, RouterLink, NgbModule],
  providers: [HttpClientModule, CartItemsService, TokenStorageService],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
  user: User
  cartItems: any;

  id: number;
  constructor(
    private cartItemsService: CartItemsService,
    private tokenStorageService: TokenStorageService,

  ) { }

  ngOnInit(): void {
    this.id = this.tokenStorageService.getId();
    this.cartItems = this.cartItemsService.getUserCart(this.id).subscribe(data => {
      console.log(data);
      this.cartItems = data;
      console.log(this.cartItems);

    }, error => console.log(error));
    console.log(this.cartItems);
  }

  getTotal(): number {
    var reducer = (acc: number, val: number) => acc + val;
    return this.cartItems ? this.cartItems.map((item: { totalPrice: number; }) => item.totalPrice as number).reduce(reducer, 0) : 0;

  }
}
