package com.sagar.libraryapp.service;

import com.sagar.libraryapp.model.UserCheckOutDetails;

public interface CheckoutService {

    void checkoutBook(String email, long bookId);
    UserCheckOutDetails checkedoutBooks(String email, long bookId);
    void renewBook(String email, long bookId);
    void returnBook(String email, long bookId);

}
