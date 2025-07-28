package com.tendora_server.tendora.modules.product.controller;

import com.tendora_server.tendora.modules.product.dto.Productdto;
import com.tendora_server.tendora.modules.product.entities.*;


import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import com.tendora_server.tendora.modules.product.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;


@RestController
@RequestMapping("/api/products")    
public class ProductController {

    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(@RequestParam (required = false) UUID categoryId,@RequestParam (required = false) UUID typeId) {
        List<Product> productList = productService.getAllProducts(categoryId, typeId);
        return new ResponseEntity<>(productList,HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Productdto productdto){
        Product product = productService.addProduct(productdto);
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }
} 
