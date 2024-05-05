package com.idl.mnir.repository;

import com.idl.mnir.entities.Cart.CartItem;
import com.idl.mnir.entities.Cart.CartItemPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, CartItemPK> {
}
