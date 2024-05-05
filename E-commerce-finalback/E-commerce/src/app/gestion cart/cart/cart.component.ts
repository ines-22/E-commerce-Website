import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { CartItem } from '../CartItem';
import { User } from '../../gestion user/user';
import { CartItemsService } from '../../_services/cart-items.service';
import { UserGestionService } from '../../_services/user-gestion.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TokenStorageService } from '../../_services/token-storage.service';
import { HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs';
import { ModalDismissReasons, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule,
        FontAwesomeModule, HttpClientModule, RouterLink, NgbModule
    ],
    providers: [HttpClientModule, UserGestionService, CartItemsService, TokenStorageService],

    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
    caretUp = faCaretUp;
    caretDown = faCaretDown;

    user: User
    cartItems: any;

    id: number;
    constructor(
        private router: Router,
        private UserGestionService: UserGestionService,
        private cartItemsService: CartItemsService,
        private tokenStorageService: TokenStorageService, private route: ActivatedRoute,

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



    getItems(id: number) {
        this.cartItems = this.cartItemsService.getUserCart(this.id);
        return this.cartItems;
    }

    getTotal(): number {
        var reducer = (acc: number, val: number) => acc + val;
        return this.cartItems ? this.cartItems.map((item: { totalPrice: number; }) => item.totalPrice as number).reduce(reducer, 0) : 0;

    }


    increaseQuantity(item: CartItem) {
        this.cartItemsService.updateUserCartItem(
            this.id, item.product.productId, item.quantity + 1).subscribe(res => {
                console.log(res);
                this.getItems(this.id);
            })
    }

    decreaseQuantity(item: CartItem) {
        if (item.quantity - 1 <= 0) {
            this.cartItemsService.deleteUserCartItem(this.id, item.product.productId).subscribe(res => {
                console.log(res)
                this.getItems(this.id)
            })
        } else {
            this.cartItemsService.updateUserCartItem(
                this.id, item.product.productId, item.quantity - 1).subscribe(res => {
                    console.log(res)
                    this.getItems(this.id)
                })
        }
    }

    deleteProduct(item: CartItem) {
        this.getItems(this.id);
        console.log(item.product.productId);
        console.log(this.id);
        console.log(this.getItems(this.id));
        this.cartItemsService.deleteUserCartItem(this.id, item.product.productId);
        this.getItems(this.id);
        console.log(this.getItems(this.id));
    }

}



