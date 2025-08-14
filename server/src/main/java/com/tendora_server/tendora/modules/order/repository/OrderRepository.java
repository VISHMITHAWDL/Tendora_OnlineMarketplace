package com.tendora_server.tendora.modules.order.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.tendora_server.tendora.modules.order.entities.Order;  
import java.util.UUID;
import com.tendora_server.tendora.modules.auth.entities.User;
import java.util.List;
@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {
    List<Order> findByUser(User user);

}



