package com.tendora_server.tendora.modules.product.repository;
import com.tendora_server.tendora.modules.product.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID>, JpaSpecificationExecutor<Product> {
    // Additional query methods can be defined here if needed

}
