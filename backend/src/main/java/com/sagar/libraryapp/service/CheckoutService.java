package com.sagar.libraryapp.service;

public interface CheckoutService {

    void checkoutBook(String email, int bookId);

    int checkedoutBooks(String email);

}
