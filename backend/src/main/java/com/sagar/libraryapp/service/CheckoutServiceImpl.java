package com.sagar.libraryapp.service;

import com.sagar.libraryapp.exception.BookNotFoundException;
import com.sagar.libraryapp.model.Book;
import com.sagar.libraryapp.model.Checkout;
import com.sagar.libraryapp.model.History;
import com.sagar.libraryapp.model.UserCheckOutDetails;
import com.sagar.libraryapp.repository.BookRepository;
import com.sagar.libraryapp.repository.CheckoutRepository;
import com.sagar.libraryapp.repository.HistoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    private final CheckoutRepository checkoutRepository;
    private final BookRepository bookRepository;

    private final HistoryRepository historyRepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(CheckoutServiceImpl.class);

    @Autowired
    public CheckoutServiceImpl(CheckoutRepository checkoutRepository, BookRepository bookRepository, HistoryRepository historyRepository) {
        this.checkoutRepository = checkoutRepository;
        this.bookRepository = bookRepository;
        this.historyRepository = historyRepository;
    }

    @Override
    @Transactional
    public void checkoutBook(String email, long bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new BookNotFoundException("Book not found"));
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
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new BookNotFoundException("Book not found"));
        Optional<Checkout> checkout = checkoutRepository.findByUserEmailAndBookId(email, bookId);
        if(checkout.isPresent()){
            isCheckedOut = true;
        }
        int count = checkoutRepository.countByUserEmail(email);
        return new UserCheckOutDetails(count, isCheckedOut);
    }


    @Override
    public void renewBook(String email, long bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new BookNotFoundException("Book not found"));
        Checkout checkout = checkoutRepository.findByUserEmailAndBookId(email, bookId)
                .orElseThrow(() -> new RuntimeException("Book is currently not checked out by this user"));

        LOGGER.info("The checked out book is ---> {}", checkout);

        if(LocalDate.parse(checkout.getReturnDate()).isBefore(LocalDate.now())) {
            throw new RuntimeException("The book is overdue and cannot be renewed");
        }
        checkout.setReturnDate(LocalDate.parse(checkout.getReturnDate()).plusDays(7).toString());
        checkoutRepository.save(checkout);
    }

    @Override
    @Transactional
    public void returnBook(String email, long bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new BookNotFoundException("Book not found"));
        Checkout checkout = checkoutRepository.findByUserEmailAndBookId(email, bookId)
                .orElseThrow(() -> new RuntimeException("Book is currently not checked out by this user"));

        LOGGER.info("The checked out book is ---> {}", checkout);

        checkoutRepository.delete(checkout);

        book.setCopiesAvailable(book.getCopiesAvailable() + 1);
        bookRepository.save(book);

        historyRepository.save(new History(email, checkout.getCheckoutDate(), LocalDate.now().toString(),
                book.getTitle(), book.getAuthor(),book.getDescription(), book.getImg()));


    }
}
