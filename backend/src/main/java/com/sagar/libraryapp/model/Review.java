package com.sagar.libraryapp.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "user_email")
    private String userEmail;
    @Column(name = "date")
    private LocalDateTime date;
    @Column(name = "rating")
    private float rating;
    @Column(name = "book_id")
    private long bookId;
    @Column(name = "review_description")
    private String review_description;

    public Review() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public long getBookId() {
        return bookId;
    }

    public void setBookId(long bookId) {
        this.bookId = bookId;
    }

    public String getReview_description() {
        return review_description;
    }

    public void setReview_description(String review_description) {
        this.review_description = review_description;
    }

    @Override
    public String toString() {
        return "Review{" +
                "id=" + id +
                ", userEmail='" + userEmail + '\'' +
                ", date=" + date +
                ", rating=" + rating +
                ", bookId=" + bookId +
                ", review_description='" + review_description + '\'' +
                '}';
    }
}
