package com.tendora.tendora_server.modules.product.services;

import java.util.List;
import com.tendora.tendora_server.modules.product.entities.Product;
import com.tendora.tendora_server.modules.product.dto.Productdto;
import com.tendora.tendora_server.modules.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;  
import org.springframework.stereotype.Service;
import com.tendora.tendora_server.modules.product.services.ProductService;

@Service
public class ProductServiceimpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product addProduct(Productdto product){

        return null;
    };
    @Override
    public List<Product> getAllProducts(){
        List<Product> products = productRepository.findAll();
        return products;
    }

    private Product createProduct(Productdto productdto) {
        Product product = new Product();
        product.setName(productdto.getName());
        product.setDescription(productdto.getDescription());
        product.setPrice(productdto.getPrice());
        product.setBrand(productdto.getBrand());
        product.setNewArrival(productdto.getNewArrival());
        // Set other fields as necessary
        return productRepository.save(product);
    }

}
