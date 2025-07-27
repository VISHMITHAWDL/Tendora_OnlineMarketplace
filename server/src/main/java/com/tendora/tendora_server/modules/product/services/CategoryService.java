package com.tendora.tendora_server.modules.product.services;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.tendora.tendora_server.modules.product.dto.CategoryDto;
import com.tendora.tendora_server.modules.product.entities.Category;
import com.tendora.tendora_server.modules.product.repository.CategoryRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import com.tendora.tendora_server.modules.product.entities.CategoryType;
import com.tendora.tendora_server.modules.product.dto.CategoryTypeDto;


@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category getCategory(UUID categoryId) {
        Optional<Category> category = categoryRepository.findById(categoryId);
        return category.orElse(null);
    }

    public Category createCategory(CategoryDto categoryDto) { 
        Category category = mapToEntity(categoryDto);
        return categoryRepository.save(category);

    }

    private Category mapToEntity(CategoryDto categoryDto) {
        Category category = Category.builder()
                .name(categoryDto.getName())
                .code(categoryDto.getCode())
                .description(categoryDto.getDescription())
                .categoryTypes(mapToCategoryTypes(categoryDto.getCategoryTypeList()))
                .build();
        // Map other fields as necessary
         return category;
    }

    private List<CategoryType> mapToCategoryTypes(List<CategoryTypeDto> categoryTypeList) {
        return categoryTypeList.stream()
                .map(categoryTypeDto ->{
                    CategoryType categoryType = new CategoryType();
                    categoryType.setName(categoryTypeDto.getName());
                    categoryType.setCode(categoryTypeDto.getCode());
                    categoryType.setDescription(categoryTypeDto.getDescription());
                    return categoryType;
                }).collect(Collectors.toList());
    }

}
