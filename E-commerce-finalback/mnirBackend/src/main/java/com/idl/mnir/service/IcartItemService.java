package com.idl.mnir.service;

import com.idl.mnir.entities.Cart.CartItem;

import java.util.List;

public interface IcartItemService
{
    List<CartItem> getCartItems ();
    CartItem getCartItem (Long userId, Long productId);
    CartItem addCartItem(CartItem cartItem);
    CartItem updateCartItem(CartItem cartItem);
    void deleteCartItem (Long userId, Long productId);

}
