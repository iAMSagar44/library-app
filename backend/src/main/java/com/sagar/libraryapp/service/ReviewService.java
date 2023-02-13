package com.sagar.libraryapp.service;

import com.sagar.libraryapp.model.Review;

public interface ReviewService {
    Review retrieveReviewsByBookId(long bookId);

}
