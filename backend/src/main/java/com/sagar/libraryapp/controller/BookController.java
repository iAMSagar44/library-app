package com.sagar.libraryapp.controller;

import com.sagar.libraryapp.model.Book;
import com.sagar.libraryapp.service.BookService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api")
public class BookController {
    private final BookService bookService;
    private static final Logger LOGGER = LoggerFactory.getLogger(BookController.class);
    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/books")
    public Page<Book> getAllBooksWithPagination(@RequestParam(value = "page") int page, @RequestParam(value = "size") int size){
        return bookService.getBooksPageable(page,size);
    }

    @GetMapping("/books/{id}")
    public Book getBook(@PathVariable long id){
        return bookService.getBook(id).orElseThrow(() -> new RuntimeException("Book not found"));
    }
}
