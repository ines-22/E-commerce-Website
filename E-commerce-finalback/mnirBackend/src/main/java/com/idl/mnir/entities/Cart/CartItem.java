package com.idl.mnir.entities.Cart;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.idl.mnir.entities.Product;
import com.idl.mnir.entities.User;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

@Entity
public class CartItem implements Serializable
{
    @EmbeddedId
    @JsonIgnore
    private CartItemPK pk;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date addedOn = new Date();

    @Column(nullable = false)
    private int quantity = 1;

    public CartItem () {

    }

    public CartItem (User user, Product product, int quantity) {
        pk = new CartItemPK();
        pk.setUser(user);
        pk.setProduct(product);
        this.quantity = quantity;
    }

    @Transient
    public Product getProduct () {
        return pk.getProduct();
    }

    @Transient
    public double getTotalPrice () {
        return quantity * getProduct().getProductPrice();
    }

    public CartItemPK getPk() {
        return pk;
    }

    public void setPk(CartItemPK pk) {
        this.pk = pk;
    }

    public Date getAddedOn() {
        return addedOn;
    }

    public void setAddedOn(Date addedOn) {
        this.addedOn = addedOn;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass())
            return false;

        CartItem that = (CartItem) o;
        return Objects.equals(pk.getUser().getUser_id(), that.pk.getUser().getUser_id()) &&
                Objects.equals(getProduct().getProductId(), that.getProduct().getProductId());
    }
}
