package com.tendora_server.tendora.modules.product.services;

import java.util.List;
import java.util.UUID;


import com.tendora_server.tendora.modules.product.entities.Category;

import com.tendora_server.tendora.modules.product.entities.CategoryType;
import com.tendora_server.tendora.modules.product.entities.Product;
import com.tendora_server.tendora.modules.product.entities.ProductVariant;
import com.tendora_server.tendora.modules.product.dto.Productdto;
import com.tendora_server.tendora.modules.product.repository.ProductRepository;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import java.util.stream.Collectors;

import com.tendora_server.tendora.common.exception.ResourceNotFoundException;
import com.tendora_server.tendora.modules.product.dto.ProductResourceDto;
import com.tendora_server.tendora.modules.product.dto.ProductVariantDto;
import com.tendora_server.tendora.modules.product.entities.Resource;
import com.tendora_server.tendora.modules.product.specification.ProductSpecification;
import com.tendora_server.tendora.modules.product.mapper.ProductMapper;



@Service
public class ProductServiceimpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryService categoryService;

 
    @Autowired
    private ProductMapper productMapper;

    @Override
    public Product addProduct(Productdto productdto){
        Product product =productMapper.mapToProductEntity(productdto);
        return productRepository.save(product); 
    };
    @Override
    public List<Productdto> getAllProducts(UUID categoryId, UUID typeId){

        Specification<Product> productSpecification = Specification.where(null);
        if (categoryId != null) {
            productSpecification = productSpecification.and(ProductSpecification.hasCategoryId(categoryId));
        }

        if (typeId != null) {
            productSpecification = productSpecification.and(ProductSpecification.hasCategoryTypeId(typeId));
        }
        List<Product> products = productRepository.findAll(productSpecification);
        return productMapper.getProductDtos(products);
    }

    @Override
    public Productdto getProductBySlug(String slug) {
        Product product = productRepository.findBySlug(slug);
        if (null == product) {
            throw new ResourceNotFoundException("Product not found with slug: " + slug);
        }
        Productdto productdto = productMapper.mapToProductDto(product);
        productdto.setCategoryId(product.getCategory().getId());
        productdto.setCategoryTypeId(product.getCategoryType().getId());
        productdto.setVariants(productMapper.mapToProductVariantListToDto(product.getProductVariants()));
        productdto.setProductResources(productMapper.mapToProductResourceListToDto(product.getResources()));
                
        return productdto; 

    }

    @Override
    public Productdto getProductById(UUID id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));  
        Productdto productdto = productMapper.mapToProductDto(product);
        productdto.setCategoryId(product.getCategory().getId());
        productdto.setCategoryTypeId(product.getCategoryType().getId());
        productdto.setVariants(productMapper.mapToProductVariantListToDto(product.getProductVariants()));
        productdto.setProductResources(productMapper.mapToProductResourceListToDto(product.getResources()));
        
        return productdto;


    }


    @Override
    public Product updateProduct(Productdto productdto) {
        Product existingProduct = productRepository.findById(productdto.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productdto.getId()));
        
        return productRepository.save(productMapper.mapToProductEntity(productdto));
    }

    @Override
    public Product fetchProductById(UUID id) throws Exception {
        return productRepository.findById(id).orElseThrow(BadRequestException::new);
    }
    
}
