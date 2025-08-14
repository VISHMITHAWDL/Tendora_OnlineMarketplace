package com.tendora_server.tendora.modules.product.dto;
import java.util.UUID;
import lombok.AllArgsConstructor;       
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResourceDto {
    private UUID id;
    private String name;
    private String type;
    private String url;
    private Boolean isPrimary;
}
