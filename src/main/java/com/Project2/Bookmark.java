package com.Project2;

import javax.persistence.*;

@Entity
public class Bookmark {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int bookmarkId;

    private String movieId;
    private int userId;

    public int getBookmarkId() {
        return bookmarkId;
    }

    public void setBookmarkId(int bookmarkId) {
        this.bookmarkId = bookmarkId;
    }

    public String getMovieId() {
        return movieId;
    }

    public void setMovieId(String movieId) {
        this.movieId = movieId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}

