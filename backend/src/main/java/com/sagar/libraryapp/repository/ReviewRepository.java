package com.sagar.libraryapp.repository;

import com.sagar.libraryapp.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Review findByBookId(long bookId);
}