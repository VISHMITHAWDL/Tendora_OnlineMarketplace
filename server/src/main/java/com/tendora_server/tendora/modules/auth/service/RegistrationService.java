package com.tendora_server.tendora.modules.auth.service;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ServerErrorException;

import com.tendora_server.tendora.modules.auth.entities.User;
import com.tendora_server.tendora.modules.auth.helper.VerificationCodeGenerator;
import com.tendora_server.tendora.modules.auth.authdto.RegistrationRequest;
import com.tendora_server.tendora.modules.auth.authdto.RegistrationResponse;
import com.tendora_server.tendora.modules.auth.repository.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class RegistrationService {

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthorityService authorityService;

    public RegistrationResponse createUser(RegistrationRequest registrationRequest) {

      User existingUser = userDetailsRepository.findByEmail(registrationRequest.getEmail());
      if (existingUser != null) {
         return RegistrationResponse.builder()
                .code(400)
                .message("User already exists with this email")
                .build();
      }

      try{

        User user =  new User();
        user.setFirstName(registrationRequest.getFirstName());
        user.setLastName(registrationRequest.getLastName());
        user.setEmail(registrationRequest.getEmail());
        user.setEnabled(false);
        user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
        user.setProvider("manual");
        String code =VerificationCodeGenerator.generateCode();
        user.setVerificationCode(code);
        user.setAuthorities(authorityService.getUserAuthority());
        userDetailsRepository.save(user);


        return RegistrationResponse.builder()
                .code(200)
                .message("User registered successfully. Please verify your email using the code: ")
                .build();



      }catch(Exception e){
        // Log the exception (not shown here for brevity)
        // Return a server error response
        throw new ServerErrorException(e.getMessage(),e.getCause());
      }
    }




}
