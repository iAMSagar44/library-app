package com.sagar.libraryapp.service;

import com.sagar.libraryapp.model.Book;
import com.sagar.libraryapp.model.Checkout;
import com.sagar.libraryapp.model.History;
import com.sagar.libraryapp.repository.BookRepository;
import com.sagar.libraryapp.repository.CheckoutRepository;
import com.sagar.libraryapp.repository.HistoryRepository;
import com.sagar.libraryapp.responsemodel.LoanedBooks;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class LoanService {

    private final BookRepository bookRepository;
    private final CheckoutRepository checkoutRepository;

    private final HistoryRepository historyRepository;
    
    private static final Logger LOGGER = LoggerFactory.getLogger(LoanService.class);
    @Autowired
    public LoanService(BookRepository bookRepository, CheckoutRepository checkoutRepository, HistoryRepository historyRepository) {
        this.bookRepository = bookRepository;
        this.checkoutRepository = checkoutRepository;
        this.historyRepository = historyRepository;
    }

    public List<LoanedBooks> retrieveLoanedBooks(String email){
        List<LoanedBooks> loanedBooksList = new ArrayList<>();
        List<Checkout> checkoutList = checkoutRepository.findByUserEmail(email);
        checkoutList.sort(Comparator.comparing((Checkout checkout) -> LocalDate.parse(checkout.getReturnDate())).reversed());
        LOGGER.info("The books checked out by the user {} is {}", email,
                checkoutList);
        if(!checkoutList.isEmpty()){
            LOGGER.info("Inside IF statement");
            List<Long> bookIDs = checkoutList.stream().map(Checkout::getBookId).toList();
            LOGGER.info("The Books Ids are --> {}", bookIDs);
            List<Book> books = bookRepository.findAllById(bookIDs);
            for (Book book:books) {
                for (Checkout checkout: checkoutList) {
                    if(book.getId().equals(checkout.getBookId())) {
                        Period period = Period.between(LocalDate.now(), LocalDate.parse(checkout.getReturnDate()));
                        loanedBooksList.add(new LoanedBooks(book, LocalDate.parse(checkout.getReturnDate()),
                                period.getDays(), period.getMonths(), period.getYears(), period.isNegative()));
                    }
                }
            }
            loanedBooksList.sort(Comparator.comparing(LoanedBooks::returnDate));
        }
        return loanedBooksList;
    }

    public Page<History> retrieveHistory(String email, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return historyRepository.findByUserEmail(email, pageRequest);
    }
}
