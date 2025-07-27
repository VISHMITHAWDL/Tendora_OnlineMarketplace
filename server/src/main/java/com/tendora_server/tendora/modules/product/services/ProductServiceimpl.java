package com.tendora_server.tendora.modules.product.services;

import java.util.List;
import java.util.UUID;


import com.tendora_server.tendora.modules.product.entities.Category;

import com.tendora_server.tendora.modules.product.entities.CategoryType;
import com.tendora_server.tendora.modules.product.entities.Product;
import com.tendora_server.tendora.modules.product.entities.ProductVariant;
import com.tendora_server.tendora.modules.product.dto.Productdto;
import com.tendora_server.tendora.modules.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import java.util.stream.Collectors;

import com.tendora_server.tendora.modules.product.dto.ProductResourceDto;
import com.tendora_server.tendora.modules.product.dto.ProductVariantDto;
import com.tendora_server.tendora.modules.product.entities.Resource;
import com.tendora_server.tendora.modules.product.specification.ProductSpecification;




@Service
public class ProductServiceimpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryService categoryService;

    @Override
    public Product addProduct(Productdto productdto){
        Product product =mapToProductEntity(productdto);
        return productRepository.save(product); 
    };
    @Override
    public List<Product> getAllProducts(UUID categoryId, UUID typeId){

        Specification<Product> productSpecification = Specification.where(null);
        if (categoryId != null) {
            productSpecification = productSpecification.and(ProductSpecification.hasCategoryId(categoryId));
        }

        if (typeId != null) {
            productSpecification = productSpecification.and(ProductSpecification.hasCategoryTypeId(typeId));
        }
        List<Product> products = productRepository.findAll(productSpecification);
        return products;
    }

    private Product mapToProductEntity(Productdto productdto) {
        Product product = new Product();
        product.setName(productdto.getName());
        product.setDescription(productdto.getDescription());
        product.setPrice(productdto.getPrice());
        product.setRating(productdto.getRating());

        product.setBrand(productdto.getBrand());
        product.setNewArrival(productdto.isNewArrival());

        Category category = categoryService.getCategory(productdto.getCategoryId());

        if(null!= category) {
            product.setCategory(category);
            UUID categoryTypeId = productdto.getCategoryTypeId();
            CategoryType categoryType = category.getCategoryTypes().stream().filter(ct -> ct.getId().equals(categoryTypeId)).findFirst().orElse(null);
            product.setCategoryType(categoryType);
        }

        if (null != productdto.getVariants()) {
            List<ProductVariant> productVariants = mapToProductVariant(productdto.getVariants(), product);
            product.setProductVariants(mapToProductVariant(productdto.getVariants(), product  ));
        }


        if(null != productdto.getProductResources()) {
            product.setResources(mapToProductResources(productdto.getProductResources(), product));
      
        }
        return productRepository.save(product) ;
    } 



    private List<Resource> mapToProductResources(List<ProductResourceDto> productResources, Product product) {

        return productResources.stream().map(productResourceDto -> {
            Resource resources= new Resource();

            resources.setName(productResourceDto.getName());
            resources.setType(productResourceDto.getType());
            resources.setUrl(productResourceDto.getUrl());
            resources.setIsPrimary(productResourceDto.getIsPrimary());
            resources.setProduct(product);
            return resources;
        }).collect(Collectors.toList());
    }



    private List<ProductVariant> mapToProductVariant(List<ProductVariantDto> productVariantDtos, Product product){
        return productVariantDtos.stream().map(productVariantDto -> {
            ProductVariant productVariant = new ProductVariant();
            if(null != productVariantDto.getId()){
                productVariant.setId(productVariantDto.getId());
            }
            productVariant.setColor(productVariantDto.getColor());
            productVariant.setSize(productVariantDto.getSize());
            productVariant.setStockQuantity(productVariantDto.getStockQuantity());
            productVariant.setProduct(product);
            return productVariant;
        }).collect(Collectors.toList());
    }

}
