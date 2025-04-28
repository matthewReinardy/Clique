package com.clique.app.rest.Repo;

import com.clique.app.rest.Models.Ad;
import com.clique.app.rest.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdRepo extends JpaRepository<Ad, Long> {
    List<Ad> findByUser(User user);
}
