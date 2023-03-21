package com.sagar.libraryapp.repository;

import com.sagar.libraryapp.model.Messages;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessagesRepository extends JpaRepository<Messages, Long> {
    Page<Messages> findByUserEmail(String userEmail, Pageable pageable);
}