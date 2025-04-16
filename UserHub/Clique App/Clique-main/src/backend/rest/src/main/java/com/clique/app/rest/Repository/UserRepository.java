package com.clique.app.rest.Repository;

import com.clique.app.rest.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository <User,Long> {
    User findByEmail(String email);

}
