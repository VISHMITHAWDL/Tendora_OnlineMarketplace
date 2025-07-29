package com.tendora_server.tendora.modules.auth.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;




@Configuration
@EnableWebSecurity
public class WebSecurityConfig{


    @Autowired
    private UserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests((authorize) -> authorize
                .requestMatchers(HttpMethod.GET ,"/api/products/**", "/api/category/**").permitAll() 
                .requestMatchers(HttpMethod.GET, "/v3/api-docs/**","/swagger-ui/**","/swagger-ui.html").permitAll()
                .anyRequest().authenticated());
           return http.build(); // Disable CSRF for simplicity, enable in production with proper CSRF token handling
    }

  
   
    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider deoauthenticationProvider = new DaoAuthenticationProvider();
        deoauthenticationProvider.setUserDetailsService(userDetailsService) ;
        deoauthenticationProvider.setPasswordEncoder(passwordEncoder()); 
        return new ProviderManager(deoauthenticationProvider);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

}
