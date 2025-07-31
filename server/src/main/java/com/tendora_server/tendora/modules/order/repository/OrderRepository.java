package com.tendora_server.tendora.modules.order.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.tendora_server.tendora.modules.order.entities.Order;  
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {

}



