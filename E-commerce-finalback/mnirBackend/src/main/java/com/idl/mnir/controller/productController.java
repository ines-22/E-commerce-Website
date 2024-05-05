package com.idl.mnir.controller;

import com.idl.mnir.entities.Product;

import com.idl.mnir.service.IproductService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@AllArgsConstructor
@RequestMapping("/api/gestion_produit")
public class productController {

    IproductService productService;

    @GetMapping("/products")
    public List<Product> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return products;
    }
    @PostMapping("/addproduct")
    @PreAuthorize("hasRole('ADMIN')")
    public Product creatProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }

    @DeleteMapping("/deleteproduct/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteProduct(@PathVariable Long id){
        productService.deleteProduct(id);
    }
    @GetMapping("/product/{id}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<Product> getProduct(@PathVariable Long id){
        Optional<Product> product = productService.getProduct(id);

        if (product.isPresent()) {
            return ResponseEntity.ok(product.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/updateproduct/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
            return productService.updateProduct(id,product);}




    @GetMapping("/findbysexe/{sexe}")
    public List<Product> findbySexe(@PathVariable String sexe){
        return productService.findbySexe(sexe);
    }
    @GetMapping("/findbySize/{size}")
    public List<Product> findbySize( @PathVariable String size){
        return productService.findbySize(size);
    }
    @GetMapping("/findbyPrice/{pricemin}/{pricemax}")
    public List<Product> findbyPrice(@PathVariable float pricemin, @PathVariable float pricemax){
        return productService.findbyPrice(pricemin, pricemax);
    }
    @GetMapping("/findbySeason/{season}")
    public List<Product> findbySeason(@PathVariable String season){
        return productService.findbySeason(season);
    }

    @GetMapping("/findByAttributes/{attributeValue}")
    public List<Product> findByAttributes(@PathVariable String attributeValue){
        return productService.findByAttributes(attributeValue);
    }


}
