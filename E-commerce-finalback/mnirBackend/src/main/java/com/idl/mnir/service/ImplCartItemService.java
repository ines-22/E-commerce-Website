package com.idl.mnir.service;

import com.idl.mnir.entities.Cart.CartItem;
import com.idl.mnir.exception.CartItemAlreadyExistsException;
import com.idl.mnir.exception.CartItemDoesNotExistsException;
import com.idl.mnir.repository.CartItemRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
@Service
@Transactional
public class ImplCartItemService implements IcartItemService
{
    private CartItemRepository repo;

    public ImplCartItemService (CartItemRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<CartItem> getCartItems () {
        return repo.findAll();
    }
    @Override
    public CartItem getCartItem (Long userId, Long productId) {
        for (CartItem item : getCartItems()) {
            if (item.getPk().getUser().getUser_id() == userId && item.getPk().getProduct().getProductId() == productId) {
                return item;
            }
        }

        throw new CartItemDoesNotExistsException(
                "Cart item w/ user id " + userId + " and product id " + productId + " does not exist."
        );
    }
    @Override
    public CartItem addCartItem(CartItem cartItem) {
        for (CartItem item : getCartItems()) {
            if (item.equals(cartItem)) {
                throw new CartItemAlreadyExistsException(
                        "Cart item w/ user id " + cartItem.getPk().getUser().getUser_id() + " and product id " +
                                cartItem.getProduct().getProductId() + " already exists."
                );
            }
        }

        return this.repo.save(cartItem);
    }
    @Override
    public CartItem updateCartItem(CartItem cartItem) {
        for (CartItem item : getCartItems()) {
            if (item.equals(cartItem)) {
                item.setQuantity(cartItem.getQuantity());
                return repo.save(item);
            }
        }

        throw new CartItemDoesNotExistsException(
                "Cart item w/ user id " + cartItem.getPk().getUser().getUser_id() + " and product id " +
                        cartItem.getProduct().getProductId() + " does not exist."
        );
    }
    @Override
    public void deleteCartItem (Long userId, Long productId) {
        for (CartItem item : getCartItems()) {
            if (item.getPk().getUser().getUser_id() == userId && item.getPk().getProduct().getProductId() == productId) {
                repo.delete(item);
                return;
            }
        }

        throw new CartItemDoesNotExistsException(
                "Cart item w/ user id " + userId + " and product id " + productId + " does not exist."
        );
    }
}
