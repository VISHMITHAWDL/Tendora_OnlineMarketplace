package com.tendora.tendora_server.modules.product.repository;
import com.tendora.tendora_server.modules.product.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import org.springframework.stereotype.Repository;


@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {

}
