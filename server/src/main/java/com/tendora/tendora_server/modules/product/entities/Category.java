package com.tendora.tendora_server.modules.product.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;      
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;
import jakarta.persistence.*;
import java.util.List;

import com.tendora.tendora_server.modules.product.entities.CategoryType;

@Entity
@Table(name = "categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Category {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private String name ;

    @Column(nullable = false)
    private String code ;

    @Column(nullable = false)
    private String description ;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<CategoryType> categoryTypes;

}
