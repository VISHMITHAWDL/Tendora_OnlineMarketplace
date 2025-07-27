package com.tendora_server.tendora.modules.product.services;

import com.tendora_server.tendora.modules.product.dto.Productdto;
import com.tendora_server.tendora.modules.product.entities.Product;

import java.util.List;



public interface ProductService {

    public Product addProduct(Productdto product);
    public List<Product> getAllProducts();
}
