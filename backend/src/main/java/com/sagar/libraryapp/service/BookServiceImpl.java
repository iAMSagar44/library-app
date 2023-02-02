package com.sagar.libraryapp.service;

import com.sagar.libraryapp.model.Book;
import com.sagar.libraryapp.repository.BookRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService{
    private final BookRepository bookRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(BookServiceImpl.class);
    @Autowired
    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public List<Book> getBooks() {
        List<Book> bookList = bookRepository.findAll();
        LOGGER.info("{} books were retrieved.", bookList.size());
        return bookList;
    }

    @Override
    public List<Book> getBooksPageable(int page, int size) {
        PageRequest pr = PageRequest.of(page, size);
        List<Book> bookList = bookRepository.findAll(pr).getContent();
        LOGGER.info("{} books were retrieved.", bookList.size());
        return bookList;
    }

    @Override
    public Optional<Book> getBook(long id) {
        LOGGER.info("The book id being retrieved is:: {}", id);
        return bookRepository.findById(id);
    }
}
