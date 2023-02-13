package com.sagar.libraryapp.service;

import com.sagar.libraryapp.model.Review;

import java.util.List;

public interface ReviewService {
    List<Review> retrieveReviewsByBookId(long bookId);

}
