package com.sagar.libraryapp.service;

import com.sagar.libraryapp.model.Review;
import com.sagar.libraryapp.requestmodel.ReviewRequest;

import java.util.List;

public interface ReviewService {
    List<Review> retrieveReviewsByBookId(long bookId);
    void postReview(String email, long bookId, ReviewRequest reviewRequest);

}
