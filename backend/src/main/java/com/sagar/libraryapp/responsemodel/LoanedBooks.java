package com.sagar.libraryapp.responsemodel;

import com.sagar.libraryapp.model.Book;

import java.time.LocalDate;

public record LoanedBooks(Book book, LocalDate returnDate, int days, int months, int years, boolean overdue) {
}
