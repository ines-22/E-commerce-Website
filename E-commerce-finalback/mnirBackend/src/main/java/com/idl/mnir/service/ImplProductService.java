package com.idl.mnir.service;

import com.idl.mnir.entities.Product;

import com.idl.mnir.repository.productRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImplProductService implements  IproductService  {
    @Autowired
    private productRepository productRepository;

    @Override
    public Product addProduct(Product product) {
    return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> getProduct(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public Product updateProduct(Long id, Product updatedProduct) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product existingProduct = optionalProduct.get();

            // Update attributes if provided in the updatedProduct parameter
            if (updatedProduct.getProductName()!= null) {
                existingProduct.setProductName(updatedProduct.getProductName());
            }
            if (updatedProduct.getProductDescription() != null) {
                existingProduct.setProductDescription(updatedProduct.getProductDescription());
            }
            if (updatedProduct.getProductPrice()!= 0) {
                existingProduct.setProductPrice(updatedProduct.getProductPrice());
            }
            if (updatedProduct.getImageUrl() != null) {
                existingProduct.setImageUrl(updatedProduct.getImageUrl());
            }
            if (updatedProduct.getProductColor() != null) {
                existingProduct.setProductColor(updatedProduct.getProductColor());
            }
            if (updatedProduct.getProductSize() != null) {
                existingProduct.setProductSize(updatedProduct.getProductSize());
            }
            if (updatedProduct.getProductSexe() != null) {
                existingProduct.setProductSexe(updatedProduct.getProductSexe());
            }
            if (updatedProduct.getProductSeason() != null) {
                existingProduct.setProductSeason(updatedProduct.getProductSeason());
            }
            if (updatedProduct.getQuantityInStock() !=0) {
                existingProduct.setQuantityInStock(updatedProduct.getQuantityInStock());
            }


            // Save the updated product
            return productRepository.save(existingProduct);
        } else {
            return null; // or throw exception if needed
        }
    }

    @Override
    public List<Product> findbySexe(String sexe) {

        //Stream
        List<Product> products = productRepository.findAll();

        return products.stream().filter(x->x.getProductSexe().equals(sexe)).toList();
    }

    @Override
    public List<Product> findbySize(String size) {
        List<Product> products = productRepository.findAll();

        return products.stream().filter(x->x.getProductSize().equals(size)).toList();
    }

    @Override
    public List<Product> findbyPrice(float pricemin ,float pricemax) {
        return productRepository.findProductsByProductPriceBetween(pricemin, pricemax);
    }

    @Override
    public List<Product> findbySeason(String season) {
        List<Product> products = productRepository.findAll();

        return products.stream().filter(x->x.getProductSeason().equals(season)).toList();
    }

    @Override
    public List<Product> findByAttributes(String attributeValue) {
        return productRepository.findByAttributes(attributeValue);
    }

    /*@Override
    public List<Product> searchProduct(String attributeName, String attreibuteValue) {
        return productRepository.findByAttributes(attributeName, attreibuteValue);
    }*/
}
