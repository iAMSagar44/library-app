package com.sagar.libraryapp.service;

import com.sagar.libraryapp.model.Book;
import com.sagar.libraryapp.repository.BookRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    public Page<Book> getBooksPageable(int page, int size) {
        PageRequest pr = PageRequest.of(page, size);
        Page<Book> bookList = bookRepository.findAll(pr);
        LOGGER.info("{} of {} books were retrieved.", bookList.getNumberOfElements(), bookList.getTotalElements());
        return bookList;
    }

    @Override
    public Page<Book> getBooksByTitle(String title, int page, int size) {
        PageRequest pr = PageRequest.of(page, size);
        LOGGER.info("The Title being requested is: {}", title);
        Page<Book> bookList = bookRepository.findByTitleContaining(title,pr);
        LOGGER.info("{} of {} books were retrieved.", bookList.getNumberOfElements(), bookList.getTotalElements());
        return bookList;
    }

    @Override
    public Page<Book> getBooksByCategory(String category, int page, int size) {
        PageRequest pr = PageRequest.of(page, size);
        LOGGER.info("The category being requested is: {}", category);
        Page<Book> bookList = bookRepository.findByCategory(category, pr);
        LOGGER.info("{} of {} books were retrieved.", bookList.getNumberOfElements(), bookList.getTotalElements());
        return bookList;
    }

    @Override
    public Optional<Book> getBook(long id) {
        LOGGER.info("The book id being retrieved is:: {}", id);
        return bookRepository.findById(id);
    }

    @Override
    public void saveBook(Book book) {
        LOGGER.info("The book being saved is: {}", book.getTitle());
        bookRepository.save(book);
    }
}
