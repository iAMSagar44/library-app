package com.sagar.libraryapp.service;

import com.sagar.libraryapp.exception.BookNotFoundException;
import com.sagar.libraryapp.model.Book;
import com.sagar.libraryapp.repository.BookRepository;
import com.sagar.libraryapp.repository.CheckoutRepository;
import com.sagar.libraryapp.repository.ReviewRepository;
import com.sagar.libraryapp.requestmodel.BookQuantityRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService{
    private final BookRepository bookRepository;
    private final CheckoutRepository checkoutRepository;
    private final ReviewRepository reviewRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(BookServiceImpl.class);
    @Autowired
    public BookServiceImpl(BookRepository bookRepository, CheckoutRepository checkoutRepository, ReviewRepository reviewRepository) {
        this.bookRepository = bookRepository;
        this.checkoutRepository = checkoutRepository;
        this.reviewRepository = reviewRepository;
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

    @Override
    public void updateQuantity(BookQuantityRequest bookQuantityRequest, long id) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new BookNotFoundException("Book not found"));
        if(bookQuantityRequest.subtract()){
            book.setCopies(book.getCopies() - bookQuantityRequest.quantity());
            book.setCopiesAvailable(book.getCopiesAvailable() - bookQuantityRequest.quantity());
        } else {
            book.setCopies(book.getCopies() + bookQuantityRequest.quantity());
            book.setCopiesAvailable(book.getCopiesAvailable() + bookQuantityRequest.quantity());
        }
        bookRepository.save(book);
    }

    @Override
    @Transactional
    public void deleteBook(long id) {
        bookRepository.findById(id).orElseThrow(() -> new BookNotFoundException("Book not found"));
        bookRepository.deleteById(id);

        int i = checkoutRepository.deleteByBookId(id);
        LOGGER.info("The count of checkout items deleted are :: {}", i);

        int j = reviewRepository.deleteByBookId(id);
        LOGGER.info("The count of review items deleted are :: {}",j);
    }
}
