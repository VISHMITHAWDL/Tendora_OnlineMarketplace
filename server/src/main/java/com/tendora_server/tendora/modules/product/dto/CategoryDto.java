package com.tendora_server.tendora.modules.product.dto;

import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.tendora_server.tendora.modules.product.dto.CategoryTypeDto;



@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class CategoryDto {

    private UUID id;
    private String name;
    private String code;
    private String description;
    private List<CategoryTypeDto> categoryTypeList;

}


