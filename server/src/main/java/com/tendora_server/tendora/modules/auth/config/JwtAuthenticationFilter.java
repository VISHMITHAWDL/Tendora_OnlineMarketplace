package com.tendora_server.tendora.modules.auth.config;

import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import com.tendora_server.tendora.common.config.JwtTokenHelper;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;


public class JwtAuthenticationFilter extends OncePerRequestFilter {


    private final UserDetailsService userDetailsService;
    
    private final JwtTokenHelper jwtTokenHelper;




    public JwtAuthenticationFilter( JwtTokenHelper jwtTokenHelper, UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
        this.jwtTokenHelper = jwtTokenHelper;
    }   

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        if(null == authHeader || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try{


            String authToken = jwtTokenHelper.getToken(request);
            if (null!= authToken) {
                String username = jwtTokenHelper.getUsernameFromToken(authToken); 
                if (null != username) {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    if(jwtTokenHelper.validateToken(authToken, userDetails)) {
                            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                            authenticationToken.setDetails(new WebAuthenticationDetails(request));
                            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    } 
                }
            }
        }catch(Exception e) {
            System.err.println("JWT Filter Error: " + e.getMessage());
            e.printStackTrace(); // This will show you the full stack trace
            SecurityContextHolder.clearContext();
        }
        
        // Always continue the filter chain, even if JWT authentication fails
        filterChain.doFilter(request, response);
    
    }
 
}
