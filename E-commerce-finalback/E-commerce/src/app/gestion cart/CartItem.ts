import { Product } from "../gestion produit/product"

export class CartItem {
    addedOn : Date
    quantity : number
    product : Product
    totalPrice : Number
}