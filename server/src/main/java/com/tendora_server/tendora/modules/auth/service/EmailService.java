package com.tendora_server.tendora.modules.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import com.tendora_server.tendora.modules.auth.entities.User;
import org.springframework.beans.factory.annotation.Value;


@Service
public class EmailService {


    @Autowired
    private JavaMailSender javaMailSender;
    
    
    @Value("${spring.mail.username}")
    private String sender;


    public String sendMail(User user){
        String subject = "Verify your email";
        String senderName = "Tenodora";
        String mailContent = "Hello " + user.getUsername() + ",\n";
        mailContent += "Your verification code is: " + user.getVerificationCode() + "\n";
        mailContent += "Please enter this code to verify your email.";
        mailContent +="\n";
        mailContent+= senderName;

        try{
            SimpleMailMessage mailMessage
                    = new SimpleMailMessage();
            mailMessage.setFrom(sender);
            mailMessage.setTo(user.getEmail());
            mailMessage.setText(mailContent);
            mailMessage.setSubject(subject);
            javaMailSender.send(mailMessage);
        }
        catch (Exception e){
            return "Error while Sending Mail";
        }
        return "Email sent";
    }
}
