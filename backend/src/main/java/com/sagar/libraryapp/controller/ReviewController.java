package com.sagar.libraryapp.controller;

import com.sagar.libraryapp.model.Review;
import com.sagar.libraryapp.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api")
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/books/reviews/{bookId}")
    public List<Review> getReviewsByBookID(@PathVariable long bookId){
       return reviewService.retrieveReviewsByBookId(bookId);
    }
}
