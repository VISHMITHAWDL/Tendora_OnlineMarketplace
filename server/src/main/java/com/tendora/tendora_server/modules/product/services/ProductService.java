package com.tendora.tendora_server.modules.product.services;

import com.tendora.tendora_server.modules.product.dto.Productdto;
import com.tendora.tendora_server.modules.product.entities.Product;

import java.util.List;



public interface ProductService {

    public Product addProduct(Productdto product);
    public List<Product> getAllProducts();
}
