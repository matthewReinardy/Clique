package com.clique.app.rest.Repo;

import com.clique.app.rest.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {
/*
    User findByUsername(String username);
*/
//    User findByEmail(String email);
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
    Optional<User> findByUsername(String username);
    List<User> findByUsernameContainingIgnoreCase(String username);
}
