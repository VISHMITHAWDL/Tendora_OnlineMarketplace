package com.tendora_server.tendora.modules.order.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import com.tendora_server.tendora.modules.order.entities.Address;
import com.tendora_server.tendora.modules.order.entities.OrderStatus;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDetails {
    private UUID id;
    private Date orderDate;
    private Address address;
    private Double totalAmount;
    private OrderStatus orderStatus;
    private String shipmentNumber;
    private Date expectedDeliveryDate;
    private List<OrderItemDetail> orderItemList;

}
