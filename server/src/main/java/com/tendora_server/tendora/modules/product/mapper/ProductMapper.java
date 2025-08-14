

package com.tendora_server.tendora.modules.product.mapper;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.tendora_server.tendora.modules.product.dto.ProductResourceDto;
import com.tendora_server.tendora.modules.product.dto.ProductVariantDto;
import com.tendora_server.tendora.modules.product.dto.Productdto;
import com.tendora_server.tendora.modules.product.entities.Category;
import com.tendora_server.tendora.modules.product.entities.CategoryType;
import com.tendora_server.tendora.modules.product.entities.Product;
import com.tendora_server.tendora.modules.product.entities.ProductVariant;
import com.tendora_server.tendora.modules.product.entities.Resource;
import com.tendora_server.tendora.modules.product.services.CategoryService;
import com.tendora_server.tendora.modules.product.repository.ProductRepository;


@Component
public class ProductMapper {


    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ProductRepository productRepository;


    public Product mapToProductEntity(Productdto productdto) {
        Product product = new Product();
        if (productdto.getId() != null) {
            product.setId(productdto.getId());
        }

        product.setName(productdto.getName());
        product.setDescription(productdto.getDescription());
        product.setPrice(productdto.getPrice());
        product.setRating(productdto.getRating());
        product.setSlug(productdto.getSlug());
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



    public List<Resource> mapToProductResources(List<ProductResourceDto> productResources, Product product) {

        return productResources.stream().map(productResourceDto -> {
            Resource resources= new Resource();

            if(null != productResourceDto.getId()){
                resources.setId(productResourceDto.getId());
            }

            resources.setName(productResourceDto.getName());
            resources.setType(productResourceDto.getType());
            resources.setUrl(productResourceDto.getUrl());
            resources.setIsPrimary(productResourceDto.getIsPrimary());
            resources.setProduct(product);
            return resources;
        }).collect(Collectors.toList());
    }



    public List<ProductVariant> mapToProductVariant(List<ProductVariantDto> productVariantDtos, Product product){
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


    public List<Productdto> getProductDtos(List<Product> products) {
        return products.stream().map(this::mapToProductDto).toList();
    }

    public Productdto mapToProductDto(Product product) {
        return Productdto.builder()
                .id(product.getId())
                .categoryTypeId(product.getCategoryType().getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .brand(product.getBrand())
                .isNewArrival(product.isNewArrival())
                .slug(product.getSlug())
                .rating(product.getRating())
                .thumbnail(getThumbnail(product.getResources()))
                .build();
    }
    

    private String getThumbnail(List<Resource> resources) {
        return resources.stream().filter(Resource::getIsPrimary).findFirst().orElse(null).getUrl();
    }


    public List<ProductVariantDto> mapToProductVariantListToDto(List<ProductVariant> productVariants) {
       return productVariants.stream().map(this::mapToProductVariantDto).collect(Collectors.toList());

    }

    public ProductVariantDto mapToProductVariantDto(ProductVariant productVariant) {
        return ProductVariantDto.builder()
                .id(productVariant.getId())
                .color(productVariant.getColor())
                .size(productVariant.getSize())
                .stockQuantity(productVariant.getStockQuantity())
                .build();
    }

    public List<ProductResourceDto> mapToProductResourceListToDto(List<Resource> resources) {
        return resources.stream().map(this::mapToProductResourceDto).collect(Collectors.toList());
    }

    public ProductResourceDto mapToProductResourceDto(Resource resource) {
        return ProductResourceDto.builder()
                .id(resource.getId())
                .name(resource.getName())
                .type(resource.getType())
                .url(resource.getUrl())
                .isPrimary(resource.getIsPrimary())
                .build();
    }

    


}
