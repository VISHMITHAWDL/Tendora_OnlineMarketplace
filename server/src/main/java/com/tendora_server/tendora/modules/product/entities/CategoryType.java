package com.tendora_server.tendora.modules.product.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "category_type")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryType {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String code;

    @Column(nullable = false)
    private String description;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonIgnore
    private Category category;
}

