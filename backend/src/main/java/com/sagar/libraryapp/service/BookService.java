package com.sagar.libraryapp.service;

import com.sagar.libraryapp.model.Book;

import java.util.List;
import java.util.Optional;

public interface BookService {
    List<Book> getBooks();
    List<Book> getBooksPageable(int page, int size);
    Optional<Book> getBook(long id);
}
