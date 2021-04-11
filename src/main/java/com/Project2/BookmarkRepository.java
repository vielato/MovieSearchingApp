package com.Project2;

import org.springframework.data.repository.CrudRepository;
import java.util.*;

public interface BookmarkRepository extends CrudRepository<Bookmark,Long> {
    Iterable<Bookmark> findByUserId(int id);
    List<Bookmark> findByUserIdAndMovieId(int userId, String imdbId);
}
