package com.idl.mnir.entities.Cart;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.idl.mnir.entities.Product;
import com.idl.mnir.entities.User;

import javax.persistence.Embeddable;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class CartItemPK implements Serializable
{
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "productId")
    private Product product;

    public CartItemPK () {

    }

    public CartItemPK(User user, Product product) {
        this.user = user;
        this.product = product;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass())
            return false;

        CartItemPK that = (CartItemPK) o;
        return Objects.equals(user, that.user) &&
                Objects.equals(user, that.product);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, product);
    }
}
