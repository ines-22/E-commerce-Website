package com.idl.mnir.controller;

import com.idl.mnir.entities.Cart.CartItem;
import com.idl.mnir.entities.Cart.CartItemPK;
import com.idl.mnir.entities.Product;
import com.idl.mnir.entities.User;
import com.idl.mnir.service.IcartItemService;
import com.idl.mnir.service.ImplCartItemService;
import com.idl.mnir.service.IproductService;
import com.idl.mnir.service.IuserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/gestion_cart")
public class CartItemController
{

    IproductService productService;
    IuserService userService;
    IcartItemService cartItemService;

    public CartItemController(IproductService productService, IuserService userService, IcartItemService cartItemService) {
        this.productService = productService;
        this.userService = userService;
        this.cartItemService = cartItemService;
    }

    @GetMapping("/users/{user_id}/cart")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getUserCart (@PathVariable("user_id") Long id) {
        Optional<User> user = userService.getUser(id);
            System.out.println(user.get().getCartItems().size());
            return new ResponseEntity<>(user.get().getCartItems(), HttpStatus.OK);
    }

    @PostMapping("/users/{user_id}/cart/add/{productId}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<User> addToUserCart (@PathVariable("user_id") Long id,
                                               @PathVariable("productId") Long productId) {
        Optional<User> user = userService.getUser(id);
        Optional<Product> product = productService.getProduct(productId);

        CartItem cartItem = new CartItem(user.get(), product.get(), 1);
        cartItemService.addCartItem(cartItem);

        return new ResponseEntity<>(userService.getUser(id).get(), HttpStatus.CREATED);
    }

    @PutMapping("/users/{user_id}/cart/update/{productId}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")

    public ResponseEntity<User> updateCartItem (@PathVariable("user_id") Long id,
                                                @PathVariable("productId") Long productId,
                                                @RequestBody CartItem cartItem) {
        Optional<User> user = userService.getUser(id);
        Optional<Product> product = productService.getProduct(productId);

        cartItem.setPk(new CartItemPK(user.get(), product.get()));
        cartItemService.updateCartItem(cartItem);

        return new ResponseEntity<>(userService.getUser(id).get(), HttpStatus.OK);
    }
    public void deleteProduct(@PathVariable Long id){
        productService.deleteProduct(id);
    }

    @DeleteMapping("/users/{user_id}/cart/remove/{productId}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<User> removeFromUserCart (@PathVariable("user_id") Long id,
                              @PathVariable("productId") Long productId){
        cartItemService.deleteCartItem(id, productId);
        System.out.println("Product removed");
        return new ResponseEntity<>(userService.getUser(id).get(), HttpStatus.OK);

    }


    @GetMapping("/cart-items")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public List<CartItem> getCartItems (){
        return cartItemService.getCartItems();
    }



    @GetMapping("/cart-items/{user_id}/{productId}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<CartItem> getCartItem (@PathVariable("user_id") Long id,
                                                 @PathVariable("productId") Long productId) {
        return ResponseEntity.ok(cartItemService.getCartItem(id, productId));
    }

}
