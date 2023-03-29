package com.sagar.libraryapp.controller;

import com.sagar.libraryapp.exception.BookNotFoundException;
import com.sagar.libraryapp.model.Book;
import com.sagar.libraryapp.model.History;
import com.sagar.libraryapp.responsemodel.LoanedBooks;
import com.sagar.libraryapp.service.BookService;
import com.sagar.libraryapp.service.LoanService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class BookController {
    private final BookService bookService;
    private final LoanService loanService;
    private static final Logger LOGGER = LoggerFactory.getLogger(BookController.class);

    @Autowired
    public BookController(BookService bookService, LoanService loanService) {
        this.bookService = bookService;
        this.loanService = loanService;
    }

    @GetMapping("/api/books")
    public Page<Book> getAllBooksWithPagination(@RequestParam(value = "page") int page, @RequestParam(value = "size") int size,
                                                @RequestParam(value = "title", required = false) String title,
                                                @RequestParam(value = "category", required = false) String category) {

        if (title == null && category == null) {
            return bookService.getBooksPageable(page, size);
        } else if (category == null) {
            return bookService.getBooksByTitle(title, page, size);
        }
        return bookService.getBooksByCategory(category, page, size);
    }

    @GetMapping("/api/books/{id}")
    public Book getBook(@PathVariable long id) {
        return bookService.getBook(id).orElseThrow(() -> new BookNotFoundException("Book not found"));
    }

    @GetMapping("/user/api/loaned-books")
    public List<LoanedBooks> getLoanedBooks(JwtAuthenticationToken jwtAuthenticationToken) {
        String email = jwtAuthenticationToken.getToken().getSubject();
        return loanService.retrieveLoanedBooks(email);
    }

    @GetMapping("/user/api/history-books")
    public Page<History> getHistory(JwtAuthenticationToken jwtAuthenticationToken,
                                    @RequestParam(value = "page") int page,
                                    @RequestParam(value = "size") int size) {
        String email = jwtAuthenticationToken.getToken().getSubject();
        return loanService.retrieveHistory(email, page, size);
    }

    @PostMapping("/admin/api/books")
    public ResponseEntity<?> uploadBook(JwtAuthenticationToken jwtAuthenticationToken,
                                        @Valid @RequestBody Book book){
        var claims = jwtAuthenticationToken.getToken().getClaims();
        LOGGER.info("User type is, {}, {}", claims.containsKey("userType"), claims.getOrDefault("userType", "user"));
        if(!(claims.getOrDefault("userType", "user").equals("admin"))){
            throw new AccessDeniedException("User Not Allowed");
        }
        bookService.saveBook(book);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
