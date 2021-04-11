package com.Project2;

import javax.persistence.*;
import java.util.*;


@Entity// This tells Hibernate to make a table out of this
public class User {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)//.IDENTITY needed to produce independent ids to new users and movies
    private int userId;
    private String password;
    private String email;

    @OneToMany
    Set<Bookmark> bookmarks= new HashSet<Bookmark>();

    public String getEmail() {

        return email;
    }

    public void setEmail(String email) {

        this.email = email;
    }

    public String getPassword() {

        return password;
    }

    public void setPassword(String password) {

        this.password = password;
    }

    public int getId() {
        return userId;
    }
    public void setId(int id) {

        this.userId = id;
    }

    public void addBookmarks(Bookmark bookmark) {
        this.bookmarks.add(bookmark);
    }
}



