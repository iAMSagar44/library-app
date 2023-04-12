package com.sagar.libraryapp.repository;

import com.sagar.libraryapp.model.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CheckoutRepository extends JpaRepository<Checkout, Long> {
    Optional<Checkout> findByUserEmailAndBookId(String userEmail, long bookId);
    int countByUserEmail(String UserEmail);
    List<Checkout> findByUserEmail(String userEmail);
    int deleteByBookId(long bookId);

}