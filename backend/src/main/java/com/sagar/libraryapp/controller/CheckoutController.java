package com.sagar.libraryapp.controller;

import com.sagar.libraryapp.model.UserCheckOutDetails;
import com.sagar.libraryapp.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/user/api")
public class CheckoutController {

    private final CheckoutService checkoutService;
    @Autowired
    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/books/{id}/checkout")
    public ResponseEntity<?> checkoutBook(JwtAuthenticationToken jwtAuthenticationToken, @PathVariable long id) {
        String email = jwtAuthenticationToken.getToken().getSubject();
        checkoutService.checkoutBook(email, id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @GetMapping("/books/{id}")
    public UserCheckOutDetails userCheckoutDetails(JwtAuthenticationToken jwtAuthenticationToken, @PathVariable long id){
        String email = jwtAuthenticationToken.getToken().getSubject();
        return checkoutService.checkedoutBooks(email, id);
    }

}
