package com.tendora_server.tendora.modules.product.services;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.tendora_server.tendora.modules.product.dto.CategoryDto;
import com.tendora_server.tendora.modules.product.entities.Category;
import com.tendora_server.tendora.modules.product.repository.CategoryRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import com.tendora_server.tendora.modules.product.entities.CategoryType;
import com.tendora_server.tendora.modules.product.entities.Resource;
import com.tendora_server.tendora.modules.product.dto.CategoryTypeDto;
import com.tendora_server.tendora.common.exception.ResourceNotFoundException;

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
                .build();

            if(null != categoryDto.getCategoryTypes()) {
                List<CategoryType> categoryTypes = mapToCategoryTypes(categoryDto.getCategoryTypes(), category);
                category.setCategoryTypes(categoryTypes);
            }
        // Map other fields as necessary
         return category;
    }

    private List<CategoryType> mapToCategoryTypes(List<CategoryTypeDto> categoryTypeList, Category category) {
        return categoryTypeList.stream()
                .map(categoryTypeDto ->{
                    CategoryType categoryType = new CategoryType();
                    categoryType.setName(categoryTypeDto.getName());
                    categoryType.setCode(categoryTypeDto.getCode());
                    categoryType.setDescription(categoryTypeDto.getDescription());
                    categoryType.setCategory(category);
                    return categoryType;
                }).collect(Collectors.toList());
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }


    public Category updateCategory(CategoryDto categoryDto, UUID categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryId));
        if(null != categoryDto.getName()) {
            category.setName(categoryDto.getName());
        }
        if(null != categoryDto.getCode()) {
            category.setCode(categoryDto.getCode());
        }
        if(null != categoryDto.getDescription()) {
            category.setDescription(categoryDto.getDescription());
        }
        // Update other fields as necessary

        List<CategoryType> existing = category.getCategoryTypes();
        List<CategoryType> list= new ArrayList<>();

        if(categoryDto.getCategoryTypes() != null){
            categoryDto.getCategoryTypes().forEach(categoryTypeDto -> {
                if(null != categoryTypeDto.getId()){
                   Optional<CategoryType> categoryType = existing.stream().filter(t -> t.getId().equals(categoryTypeDto.getId())).findFirst();
                   CategoryType categoryType1= categoryType.get();
                   categoryType1.setCode(categoryTypeDto.getCode());
                   categoryType1.setName(categoryTypeDto.getName());
                   categoryType1.setDescription(categoryTypeDto.getDescription());
                    list.add(categoryType1);
                }
                else{
                    CategoryType categoryType = new CategoryType();
                    categoryType.setCode(categoryTypeDto.getCode());
                    categoryType.setName(categoryTypeDto.getName());
                    categoryType.setDescription(categoryTypeDto.getDescription());
                    categoryType.setCategory(category);
                    list.add(categoryType);
                }
            });
        }

        category.setCategoryTypes(list);
        return categoryRepository.save(category);
    }
    
    public void deleteCategory(UUID categoryId) {
        categoryRepository.deleteById(categoryId);
    }
 
}
