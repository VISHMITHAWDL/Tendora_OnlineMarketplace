package com.tendora_server.tendora.modules.order.services;

import java.security.Principal;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.List;

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
import com.stripe.model.PaymentIntent;
import com.tendora_server.tendora.modules.auth.entities.User;
import com.tendora_server.tendora.modules.order.entities.Order;
import com.tendora_server.tendora.modules.order.entities.OrderItem;
import com.tendora_server.tendora.modules.payment.services.PaymentIntentService;


import java.util.Date;
import java.util.HashMap;
import java.util.Objects;
import java.util.UUID;

@Service
public class OrderService {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    ProductService productService;

    @Autowired
    PaymentIntentService paymentIntentService;

    @Transactional
    public OrderResponse createOrder(OrderRequest orderRequest, Principal principal) throws Exception {
        
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
        payment.setPaymentMethod(order.getPaymentMethod());
        order.setPayment(payment);
        Order savedOrder = orderRepository.save(order);
   
        OrderResponse orderResponse = OrderResponse.builder()
                .paymentMethod(orderRequest.getPaymentMethod())
                .orderId(savedOrder.getId())
                .build();
        if(Objects.equals(orderRequest.getPaymentMethod(), "CARD")){
            orderResponse.setCredentials(paymentIntentService.createPaymentIntent(order));
        }

        return orderResponse;

 

    }


    public Map<String,String> updateStatus(String paymentIntentId, String status) {

        try{
            PaymentIntent paymentIntent= PaymentIntent.retrieve(paymentIntentId);
            if (paymentIntent != null && paymentIntent.getStatus().equals("succeeded")) {
               String orderId = paymentIntent.getMetadata().get("orderId") ;
               Order order= orderRepository.findById(UUID.fromString(orderId)).orElseThrow(BadRequestException::new);
               Payment payment = order.getPayment();
               payment.setPaymentStatus(PaymentStatus.COMPLETED);
                payment.setPaymentMethod(paymentIntent.getPaymentMethod());
                order.setPaymentMethod(paymentIntent.getPaymentMethod());
                order.setOrderStatus(OrderStatus.IN_PROGRESS);
                order.setPayment(payment);
                Order savedOrder = orderRepository.save(order);
                Map<String,String> map = new HashMap<>();
                map.put("orderId", String.valueOf(savedOrder.getId()));
                return map;
            }
            else{
                throw new IllegalArgumentException("PaymentIntent not found or missing metadata");
            }
        }
        catch (Exception e){
            throw new IllegalArgumentException("PaymentIntent not found or missing metadata");
        }
    }




}
