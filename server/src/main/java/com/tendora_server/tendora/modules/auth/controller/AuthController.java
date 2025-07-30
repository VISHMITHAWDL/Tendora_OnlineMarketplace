package com.tendora_server.tendora.modules.auth.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.tendora_server.tendora.common.config.JwtTokenHelper;
import com.tendora_server.tendora.modules.auth.authdto.LoginRequest;
import com.tendora_server.tendora.modules.auth.authdto.RegistrationResponse;
import com.tendora_server.tendora.modules.auth.authdto.UserToken;
import com.tendora_server.tendora.modules.auth.entities.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import com.tendora_server.tendora.modules.auth.authdto.RegistrationRequest;
import com.tendora_server.tendora.modules.auth.service.RegistrationService;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {


    @Autowired
 AuthenticationManager authenticationManager;


    @Autowired
    RegistrationService registrationService;


    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    JwtTokenHelper jwtTokenHelper;

    @PostMapping("/login")
    public ResponseEntity<UserToken> login (@RequestBody LoginRequest loginRequest) {
        try{
            Authentication authentication = UsernamePasswordAuthenticationToken.unauthenticated(
                loginRequest.getUserName(), 
                loginRequest.getPassword()
            );

            Authentication authenticationResponse = this.authenticationManager.authenticate(authentication);
            if (authenticationResponse.isAuthenticated()) {
                User user = (User) authenticationResponse.getPrincipal();
                if(!user.isEnabled()) {
                    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                }

                String token = jwtTokenHelper.generateToken(user.getEmail());
                UserToken userToken = UserToken.builder()
                        .token(token)
                        .build();
                return new ResponseEntity<>(userToken,HttpStatus.OK);        
            }

        }catch(BadCredentialsException e) {
           return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

    }




    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> register(@RequestBody RegistrationRequest registrationRequest) {
        // Implement registration logic here
        RegistrationResponse registrationResponse = registrationService.createUser(registrationRequest);

        return new ResponseEntity<>(registrationResponse, registrationResponse.getCode() == 200 ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    } 

    @PostMapping("/verify")
    public ResponseEntity<?> verifyCode(@RequestBody Map<String,String> map){
        String userName = map.get("userName");
        String code = map.get("code");

        User user= (User) userDetailsService.loadUserByUsername(userName);
        if(null != user && user.getVerificationCode().equals(code)){
            registrationService.verifyUser(userName);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

 
}
