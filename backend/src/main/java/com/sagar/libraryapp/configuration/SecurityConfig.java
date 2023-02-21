package com.sagar.libraryapp.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((authz) -> authz
                        .requestMatchers("/", "/actuator/**", "/api/**", "/index.html").permitAll()
                        .anyRequest().authenticated())
                .csrf().disable() //to action later
                .oauth2ResourceServer().jwt();
        return http.build();
    }
}
