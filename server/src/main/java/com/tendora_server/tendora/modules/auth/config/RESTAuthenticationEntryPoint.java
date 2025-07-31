package com.tendora_server.tendora.modules.auth.config;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class RESTAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        
        // Set response content type to JSON
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        
        // Write JSON error response
        String jsonResponse = "{"
                + "\"error\": \"Unauthorized\","
                + "\"message\": \"Authentication required to access this resource lol\","
                + "\"status\": 401,"
                + "\"path\": \"" + request.getRequestURI() + "\""
                + "}";
        
        response.getWriter().write(jsonResponse);
    }
}
