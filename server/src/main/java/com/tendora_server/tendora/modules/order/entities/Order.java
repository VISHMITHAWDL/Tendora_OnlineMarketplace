package com.tendora_server.tendora.modules.order.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tendora_server.tendora.modules.auth.entities.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.apache.commons.lang3.builder.ToStringExclude;

import com.tendora_server.tendora.modules.payment.entities.Payment;


@Entity
@Table(name="orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue
    private UUID id;

    @Temporal(TemporalType.TIMESTAMP)
    private Date orderDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",nullable = false)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "address_id",nullable = false)
    @ToStringExclude
    @JsonIgnore
    private Address address;

    @Column(nullable = false)
    private Double totalAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus orderStatus;

    @Column(nullable = false)
    private String paymentMethod;

    @Column(nullable = true)
    private String shipmentTrackingNumber;

    @Column(nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date expectedDeliveryDate;

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "order",cascade = CascadeType.ALL)
    @ToStringExclude
    private List<OrderItem> orderItemList;

    private Double discount;

    @OneToOne(fetch = FetchType.LAZY,mappedBy = "order",cascade = CascadeType.ALL)
    @ToStringExclude
    private Payment payment;

}
