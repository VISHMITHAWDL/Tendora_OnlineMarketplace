package com.tendora_server.tendora.modules.product.controller;

import com.tendora_server.tendora.modules.product.dto.Productdto;
import com.tendora_server.tendora.modules.product.entities.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;
import com.tendora_server.tendora.modules.product.services.ProductService;

import io.micrometer.common.util.StringUtils;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/products")    
public class ProductController {
    
    @Autowired
    private ProductService productService;

    
    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Productdto>> getAllProducts(@RequestParam (required = false) UUID categoryId,@RequestParam (required = false) UUID typeId,@RequestParam (required = false) String slug, HttpServletResponse response) {
        List<Productdto> productList = new ArrayList<>();
        if (StringUtils.isNotBlank(slug)){
             Productdto productdto = productService.getProductBySlug(slug);
             productList.add(productdto);
        }
        else{
            productList = productService.getAllProducts(categoryId, typeId);
        }  
        response.setHeader("Content-Range",String.valueOf(productList.size()));
        return new ResponseEntity<>(productList,HttpStatus.OK); 
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Productdto productdto){
        Product product = productService.addProduct(productdto);
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Productdto> getProductById(@PathVariable UUID id) {
        Productdto productdto = productService.getProductById(id);
        return new ResponseEntity<>(productdto, HttpStatus.OK);
    }


    @PutMapping
    public ResponseEntity<Product> updateProduct(@RequestBody Productdto productdto) {
        Product product = productService.updateProduct(productdto);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable UUID id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

} 
