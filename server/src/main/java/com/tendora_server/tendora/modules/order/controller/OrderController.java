package com.tendora_server.tendora.modules.order.controller;

import java.security.Principal;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;
import java.util.Map;
//import com.tendora_server.tendora.modules.order.dto.OrderDetails;
import com.tendora_server.tendora.modules.order.dto.OrderRequest;
import com.tendora_server.tendora.modules.order.dto.OrderResponse;
import com.tendora_server.tendora.modules.order.entities.Order;
import com.tendora_server.tendora.modules.order.services.OrderService;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    
    @Autowired
    OrderService orderService;



    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest orderRequest, Principal principal) throws Exception {
        Order orderResponse = orderService.createOrder(orderRequest,principal);
            //return new ResponseEntity<>(order, HttpStatus.CREATED);

        return new ResponseEntity<>(orderResponse,HttpStatus.CREATED);
    }

    // @PostMapping("/update-payment")
    // public ResponseEntity<?> updatePaymentStatus(@RequestBody Map<String,String> request){
    //     Map<String,String> response = orderService.updateStatus(request.get("paymentIntent"),request.get("status"));
    //     return new ResponseEntity<>(response,HttpStatus.OK);
    // }

    // @PostMapping("/cancel/{id}")
    // public ResponseEntity<?> cancelOrder(@PathVariable UUID id,Principal principal){
    //     orderService.cancelOrder(id,principal);
    //     return new ResponseEntity<>(HttpStatus.OK);
    // }

    // @GetMapping("/user")
    // public ResponseEntity<List<OrderDetails>> getOrderByUser(Principal principal) {
    //     List<OrderDetails> orders = orderService.getOrdersByUser(principal.getName());
    //     return new ResponseEntity<>(orders, HttpStatus.OK);
    // }

}
