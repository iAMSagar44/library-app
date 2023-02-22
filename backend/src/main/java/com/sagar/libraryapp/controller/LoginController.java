package com.sagar.libraryapp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/user/api")
public class LoginController {

    @GetMapping("/welcome")
    public String helloUser(Principal principal){
        return "Hello --> " + principal.getName();
    }

    @GetMapping("/details")
    public ResponseEntity<?> getUser(JwtAuthenticationToken authentication) {
        return ResponseEntity.ok().body(authentication.getToken().getSubject());
    }
}
