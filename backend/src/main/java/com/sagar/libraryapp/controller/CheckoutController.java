package com.sagar.libraryapp.controller;

import com.sagar.libraryapp.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class CheckoutController {

    private final CheckoutService checkoutService;
    @Autowired
    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/books/{id}/checkout")
    public ResponseEntity<?> checkoutBook(@PathVariable long id) {
        String email = "john.appleseed@gmail.com"; //this is a dummy value. Needs to be replaced with the authentication principal.
        checkoutService.checkoutBook(email, id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @GetMapping("/books/{id}")
    public Map<String, Object> userCheckoutDetails(@PathVariable long id){
        return Map.of("count",2, "checkedOut", true);
    }

}
