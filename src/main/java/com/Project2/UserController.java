package com.Project2;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.*;

@Controller
public class UserController {

    private int userId;
    public int getUserId() {
        return userId;
    }
    public void setUserId(int id) { this.userId = id; }

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookmarkRepository bookmarkRepository;

    /*home page*/
    @GetMapping("/")
    public String greeting() {

        return "home";
    }
    /*END home page*/


    /*create user*/
    @GetMapping("/user")
    public String signup() {

        return "signup";
    }
    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public RedirectView addUser(@ModelAttribute("SpringWeb") User user) {

        User usr = new User();
        usr.setEmail(user.getEmail());
        usr.setPassword(user.getPassword());

        Optional<User> exists = this.userRepository.findByEmail(user.getEmail());

        if (exists.isEmpty()) {
            //if a user with the email entered doesn't exist, create user and complete user's connection
            //automatically retrieve user's account(no need of signing-in)
            this.userRepository.save(usr);

            setUserId(usr.getId())  ;

            StringBuilder result = new StringBuilder();
            result.append("http://localhost:8080/movies");

            RedirectView movies = new RedirectView();
            movies.setUrl(result.toString());

            return movies;
        } else {
            // else so direct the user back to home page
            RedirectView home = new RedirectView();
            home.setUrl("http://localhost:8080/");

            return home;
        }
    }
    /*END create user*/


    /*retrieve user*/
    @GetMapping("/signin")
    public String signin() {

        return "signin";
    }

    @GetMapping("/signUser")
    public RedirectView signUser(@RequestParam String email, @RequestParam String password) {

        List<User> exists = this.userRepository.findByEmailAndPassword(email, password);
        if (exists.isEmpty()) {
            // if the user doesn't exist, direct the user back to home page
            RedirectView home = new RedirectView();
            home.setUrl("http://localhost:8080/sighin");

            return home;
        } else {

            setUserId(exists.get(0).getId());

            StringBuilder result = new StringBuilder();
            result.append("http://localhost:8080/movies");


            RedirectView movies = new RedirectView();
            movies.setUrl(result.toString());

            return movies;
        }

    }
    /*end retrieve user*/


    @GetMapping("/movies")
    public String movieSearch(Model model) {
        if(getUserId()==0){
            return "home";
        }
        else{
            model.addAttribute("id", getUserId());
            return "index";
        }
    }


    /*get movie*/
    @GetMapping("/user/{id}")
    public String showMovieById(@PathVariable int id) {
        User user=this.userRepository.findByUserId(id);
        return "index";
    }
    /*end retrieve user*/


    /*get movie*/
    @GetMapping("/movie/{imdbId}")
    public String showMovieById(String movieId, Model model, @PathVariable String imdbId) {

        return "movies";
    }


    /*get bookmarks*/
    @RequestMapping("/user/{id}/movies")
    public String showPage(@PathVariable String id, Model model) {

        ArrayList < Bookmark > bookmarkList = (ArrayList<Bookmark>) this.bookmarkRepository.findByUserId(Integer.parseInt(id));
        model.addAttribute("bookmarkList",bookmarkList) ;

        return "bookmarks";
    }



    /*create a bookmark*/
    @RequestMapping(value = "/user/{id}/movie", method = {RequestMethod.POST, RequestMethod.PUT})
    public String addBookmark(@PathVariable int id, @RequestBody String jsnstr) throws Exception
    {

        JSONObject jsonObj = new JSONObject(jsnstr); //transform the string in JSON to use it.
        String imdbId = jsonObj.getString("imdbId");
        int userId=jsonObj.getInt("userId");

        List<Bookmark> exists=this.bookmarkRepository.findByUserIdAndMovieId(getUserId(), imdbId);

        if (exists.isEmpty()){
            /*update table bookmark*/
            Bookmark bookmark= new Bookmark();
            System.out.println(getUserId());
            bookmark.setUserId(getUserId());
            bookmark.setMovieId(imdbId);
            this.bookmarkRepository.save(bookmark);

            /* update table user*/
            User user=this.userRepository.findById(getUserId()).get();
            user.addBookmarks(bookmark);
            this.userRepository.save(user);
        }else{
            throw new Exception("Already bookmarked by this user");
        }

        return "index";
    }
}
