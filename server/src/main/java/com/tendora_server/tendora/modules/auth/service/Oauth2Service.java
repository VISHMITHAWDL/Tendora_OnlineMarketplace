package com.tendora_server.tendora.modules.auth.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import com.tendora_server.tendora.modules.auth.entities.User;
import com.tendora_server.tendora.modules.auth.repository.UserDetailsRepository;



@Service
public class Oauth2Service {
    @Autowired
    UserDetailsRepository userDetailsRepository;

    @Autowired
    private AuthorityService authorityService;

    public User getUser(String userName) {
        return userDetailsRepository.findByEmail(userName);
    }

    public User createUser(OAuth2User oAuth2User, String provider) {
        String firstName = oAuth2User.getAttribute("given_name");
        String lastName = oAuth2User.getAttribute("family_name");
        String email = oAuth2User.getAttribute("email");
        User user= User.builder()
                .firstName(firstName)
                .lastName(lastName)
                .email(email)
                .provider(provider)
                .enabled(true)
                .authorities(authorityService.getUserAuthority())
                .build();
        return userDetailsRepository.save(user);
    }

}
