package com.sagar.libraryapp.service;

import com.sagar.libraryapp.model.Review;
import com.sagar.libraryapp.repository.ReviewRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService{
    private final ReviewRepository reviewRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(ReviewServiceImpl.class);

    @Autowired
    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Override
    public List<Review> retrieveReviewsByBookId(long bookId) {
        LOGGER.info("Reviews for Book ID --- {}", bookId);
        return reviewRepository.findByBookId(bookId);
    }
}
