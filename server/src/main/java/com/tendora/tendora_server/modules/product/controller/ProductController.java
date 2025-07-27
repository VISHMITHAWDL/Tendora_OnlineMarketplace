package com.tendora.tendora_server.modules.product.controller;

import com.tendora.tendora_server.modules.product.dto.Productdto;
import com.tendora.tendora_server.modules.product.entities.Product;
import com.tendora.tendora_server.modules.product.entities.Category;
import com.tendora.tendora_server.modules.product.entities.ProductVariant;
import com.tendora.tendora_server.modules.product.entities.Resource;
import com.tendora.tendora_server.modules.product.entities.CategoryType;

import org.springframework.web.bind.annotation.*;
import java.util.Collections;
import java.util.List;
import org.springframework.web.bind.annotation.RequestBody;

import com.tendora.tendora_server.modules.product.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Product Controller", description = "Handles product APIs")

@RestController
@RequestMapping("/api/products")    
public class ProductController {

    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(){
        List<Product> productList = productService.getAllProducts();
        return new ResponseEntity<>(productList,HttpStatus.OK);
    }

    @PostMapping
    public Productdto createProduct(@RequestBody Productdto product){
        return product;
    }
}
