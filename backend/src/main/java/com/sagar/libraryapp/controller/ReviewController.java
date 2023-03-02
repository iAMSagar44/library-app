package com.sagar.libraryapp.controller;

import com.sagar.libraryapp.model.Review;
import com.sagar.libraryapp.requestmodel.ReviewRequest;
import com.sagar.libraryapp.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/api/books/reviews/{bookId}")
    public List<Review> getReviewsByBookID(@PathVariable long bookId){
       return reviewService.retrieveReviewsByBookId(bookId);
    }

    @PostMapping("/user/api/books/reviews/{bookId}")
    public ResponseEntity<?> submitReview(JwtAuthenticationToken jwtAuthenticationToken,
                                          @Valid @RequestBody ReviewRequest reviewRequest, @PathVariable long bookId){
        String email = jwtAuthenticationToken.getToken().getSubject();
        reviewService.postReview(email, bookId, reviewRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
