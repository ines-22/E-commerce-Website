package com.idl.mnir.repository;

import com.idl.mnir.entities.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface productRepository extends JpaRepository<Product, Long> {

    //JPQL
   @Query(value = "SELECT p FROM Product p WHERE p.imageUrl = :attributeValue or p.productColor = :attributeValue or p.productDescription = :attributeValue or p.productName = :attributeValue or p.productSeason = :attributeValue or p.productSexe = :attributeValue or p.productSize = :attributeValue")
    List<Product> findByAttributes(@Param("attributeValue") String attributeValue);


   //Keyword
    List<Product> findProductsByProductPriceBetween(float pricemin, float pricemax);

    void deleteById(Long id);
    Optional<Product> findById (Long id);

}

