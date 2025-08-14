package com.tendora_server.tendora.modules.auth.helper;


import java.util.Random;







public class VerificationCodeGenerator {

    public static String generateCode(){
        Random random = new Random();
        int code = 100000 + random.nextInt(900000); // Generates a 6-digit code
        return String.valueOf(code);

    }

}
