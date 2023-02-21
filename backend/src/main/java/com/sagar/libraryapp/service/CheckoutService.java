package com.sagar.libraryapp.service;

public interface CheckoutService {

    void checkoutBook(String email, long bookId);
    int checkedoutBooks(String email);

}
