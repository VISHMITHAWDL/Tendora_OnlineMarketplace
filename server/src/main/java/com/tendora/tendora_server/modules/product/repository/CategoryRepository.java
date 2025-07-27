package com.tendora.tendora_server.modules.product.repository;

import com.tendora.tendora_server.modules.product.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID> {
    // Additional query methods can be defined here if needed


}
