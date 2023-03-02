package com.sagar.libraryapp.service;

import com.sagar.libraryapp.exception.BookNotFoundException;
import com.sagar.libraryapp.model.Review;
import com.sagar.libraryapp.repository.BookRepository;
import com.sagar.libraryapp.repository.ReviewRepository;
import com.sagar.libraryapp.requestmodel.ReviewRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService{
    private final ReviewRepository reviewRepository;
    private final BookRepository bookRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(ReviewServiceImpl.class);

    @Autowired
    public ReviewServiceImpl(ReviewRepository reviewRepository, BookRepository bookRepository) {
        this.reviewRepository = reviewRepository;
        this.bookRepository = bookRepository;
    }

    @Override
    public List<Review> retrieveReviewsByBookId(long bookId) {
        LOGGER.info("Reviews for Book ID --- {}", bookId);
        List<Review> reviews = reviewRepository.findByBookId(bookId);
        reviews.sort(Comparator.comparing(Review::getDate).reversed());
        return reviews;
    }

    @Override
    public void postReview(String email, long bookId, ReviewRequest reviewRequest) {
        bookRepository.findById(bookId).orElseThrow(() -> new BookNotFoundException("Book not found"));
        LOGGER.info("The review is ----> {}", reviewRequest);
        Review review = new Review();
        review.setUserEmail(email);
        review.setDate(LocalDateTime.now());
        review.setRating(reviewRequest.rating());
        review.setBookId(bookId);
        review.setReview_description(reviewRequest.review());
        reviewRepository.save(review);
    }
}
