package com.sagar.libraryapp.service;

import com.sagar.libraryapp.model.Book;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface BookService {
    List<Book> getBooks();
    Page<Book> getBooksPageable(int page, int size);
    Page<Book> getBooksByTitle(String title, int page, int size);

    Page<Book> getBooksByCategory(String category, int page, int size);

    Optional<Book> getBook(long id);
}
