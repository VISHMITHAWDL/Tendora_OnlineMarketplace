package com.tendora_server.tendora.modules.auth.authdto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class RegistrationResponse {

    private int code;
    private String message;

}
