package com.tendora_server.tendora.modules.order.services;

import java.security.Principal;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.tendora_server.tendora.modules.order.dto.OrderRequest;
import com.tendora_server.tendora.modules.order.dto.OrderResponse;
import com.tendora_server.tendora.modules.order.repository.OrderRepository;
import com.tendora_server.tendora.modules.payment.entities.Payment;
import com.tendora_server.tendora.modules.payment.entities.PaymentStatus;
import com.tendora_server.tendora.modules.product.entities.Product;
import com.tendora_server.tendora.modules.product.services.ProductService;
import org.springframework.transaction.annotation.Transactional;
import com.tendora_server.tendora.modules.order.entities.Address;
import com.tendora_server.tendora.modules.order.entities.OrderStatus; 
import com.tendora_server.tendora.modules.auth.entities.User;
import com.tendora_server.tendora.modules.order.entities.Order;
import com.tendora_server.tendora.modules.order.entities.OrderItem;
import java.util.List;
import java.util.Date;

@Service
public class OrderService {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    ProductService productService;

    @Transactional
    public Order createOrder(OrderRequest orderRequest, Principal principal) throws Exception {
        
        User user = (User) userDetailsService.loadUserByUsername(principal.getName());
        Address address = user.getAddressList().stream().filter(address1 -> orderRequest.getAddressId().equals(address1.getId())).findFirst().orElseThrow(BadRequestException::new);
            
        Order order= Order.builder()
            .user(user)
            .address(address)
            .totalAmount(orderRequest.getTotalAmount())
            .orderDate(orderRequest.getOrderDate())
            .discount(orderRequest.getDiscount())
            .expectedDeliveryDate(orderRequest.getExpectedDeliveryDate())
            .paymentMethod(orderRequest.getPaymentMethod())
            .orderStatus(OrderStatus.PENDING)
            .build();

        List<OrderItem> orderItems = orderRequest.getOrderItemRequests().stream().map(orderItemRequest -> {
            try {
                Product product= productService.fetchProductById(orderItemRequest.getProductId());
                OrderItem orderItem= OrderItem.builder()
                        .product(product)
                        .productVariantId(orderItemRequest.getProductVariantId())
                        .quantity(orderItemRequest.getQuantity())
                        .order(order)
                        .build();
                return orderItem;
            } catch (Exception e) { 
                throw new RuntimeException(e);
            }
        }).toList();
        
        order.setOrderItemList(orderItems);
        Payment payment=new Payment();
        payment.setPaymentStatus(PaymentStatus.PENDING);
        payment.setPaymentDate(new Date());
        payment.setOrder(order);
        payment.setAmount(order.getTotalAmount());
        payment.setPaymentMethod("");
        order.setPayment(payment);
        return orderRepository.save(order);





    }

}
