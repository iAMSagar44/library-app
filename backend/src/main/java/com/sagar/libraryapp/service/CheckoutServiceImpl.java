package com.sagar.libraryapp.service;

import org.springframework.stereotype.Service;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    @Override
    public void checkoutBook(String email, int bookId) {

    }

    @Override
    public int checkedoutBooks(String email) {
        return 0;
    }
}
