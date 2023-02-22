package com.sagar.libraryapp.service;

import com.sagar.libraryapp.model.Book;
import com.sagar.libraryapp.model.Checkout;
import com.sagar.libraryapp.model.UserCheckOutDetails;
import com.sagar.libraryapp.repository.BookRepository;
import com.sagar.libraryapp.repository.CheckoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    private final CheckoutRepository checkoutRepository;
    private final BookRepository bookRepository;

    @Autowired
    public CheckoutServiceImpl(CheckoutRepository checkoutRepository, BookRepository bookRepository) {
        this.checkoutRepository = checkoutRepository;
        this.bookRepository = bookRepository;
    }

    @Override
    @Transactional
    public void checkoutBook(String email, long bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));
        Optional<Checkout> byUserEmailAndBookId = checkoutRepository.findByUserEmailAndBookId(email, bookId);
        if(byUserEmailAndBookId.isPresent()) {
            throw new RuntimeException("Book has already been checked out");
        }
       Checkout checkout = new Checkout(email, LocalDate.now().toString(), LocalDate.now().plusDays(7).toString(), bookId);
        checkoutRepository.save(checkout);
        book.setCopiesAvailable(book.getCopiesAvailable()-1);
        book.setId(bookId);
        bookRepository.save(book);
    }

    @Override
    public UserCheckOutDetails checkedoutBooks(String email, long bookId) {
        boolean isCheckedOut = false;
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));
        Optional<Checkout> checkout = checkoutRepository.findByUserEmailAndBookId(email, bookId);
        if(checkout.isPresent()){
            isCheckedOut = true;
        }
        int count = checkoutRepository.countByUserEmail(email);
        return new UserCheckOutDetails(count, isCheckedOut);
    }
}
