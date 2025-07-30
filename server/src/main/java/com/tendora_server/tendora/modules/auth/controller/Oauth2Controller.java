


package com.tendora_server.tendora.modules.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.tendora_server.tendora.common.config.JwtTokenHelper;
import com.tendora_server.tendora.modules.auth.service.Oauth2Service;
import com.tendora_server.tendora.modules.auth.entities.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import java.io.IOException;


import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/oauth2")
public class Oauth2Controller {
      
    @Autowired
    Oauth2Service oAuth2Service;

    @Autowired
    private JwtTokenHelper jwtTokenHelper;

    @GetMapping("/success")
    public void callbackOAuth2(@AuthenticationPrincipal OAuth2User oAuth2User, HttpServletResponse response) throws IOException {

        String userName = oAuth2User.getAttribute("email");
        User user=oAuth2Service.getUser(userName);
        if(null == user){
            user = oAuth2Service.createUser(oAuth2User,"google");
        }

        String token = jwtTokenHelper.generateToken(user.getUsername());

        response.sendRedirect("http://localhost:5173/oauth2/callback?token="+token);

    }
    
}
