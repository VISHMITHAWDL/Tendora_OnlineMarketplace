package com.tendora.tendora_server.modules.product.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;
import com.tendora.tendora_server.modules.product.entities.Product;



@Entity
@Table(name = "product_resources")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resource {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private String name;

     @Column(nullable = false)
    private String url;

    @Column(nullable = false)
    private String type;
    
    @Column(nullable = false)
    private Boolean isPrimary;
   

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}
