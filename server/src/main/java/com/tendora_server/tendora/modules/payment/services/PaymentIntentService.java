package com.tendora_server.tendora.modules.payment.services;

import java.util.HashMap;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import com.tendora_server.tendora.modules.order.entities.Order;
import com.tendora_server.tendora.modules.auth.entities.User;

import org.springframework.stereotype.Component;
import java.util.Map;

@Component
public class PaymentIntentService {

        public Map<String, String> createPaymentIntent(Order order) throws StripeException {
        User user = order.getUser();
        Map<String, String> metaData = new HashMap<>();
        metaData.put("orderId",order.getId().toString());
        PaymentIntentCreateParams paymentIntentCreateParams= PaymentIntentCreateParams.builder()
                .setAmount((long)5000) // ₹50.00 in paise (minimum amount for Stripe)
                .setCurrency("inr")//INR currency
                .putAllMetadata(metaData)
                .setDescription("Test Payment Project -1")
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
                )
                .build();
        PaymentIntent paymentIntent = PaymentIntent.create(paymentIntentCreateParams);
        Map<String, String> map = new HashMap<>();
        map.put("client_secret", paymentIntent.getClientSecret());
        return map;
    }

}
