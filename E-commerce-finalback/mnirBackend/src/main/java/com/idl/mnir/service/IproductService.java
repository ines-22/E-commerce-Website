package com.idl.mnir.service;

import com.idl.mnir.entities.Product;
import org.springframework.data.repository.query.Param;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Optional;

public interface IproductService {

    public Product addProduct (Product product);
    public List<Product> getAllProducts();
    public Optional<Product> getProduct (Long id);
    void deleteProduct(Long id);

    public Product updateProduct( Long id, Product product);

    //public  List<Product> searchProduct(String attributeName, String attreibuteValue);

    public List<Product> findbySexe(String sexe);
    public List<Product> findbySize(String size);
    public List<Product> findbyPrice(float pricemin, float pricemax);
    public List<Product> findbySeason(String season);

    public List<Product> findByAttributes(String attributeValue);



}
