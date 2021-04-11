package com.Project2;

import org.springframework.data.repository.CrudRepository;
import java.util.List;
import java.util.Optional;


public interface UserRepository extends CrudRepository<User,Integer> {

    Optional<User> findByEmail(String email);

    User findByUserId(int id);

    List<User> findByEmailAndPassword(String email, String password);
}
