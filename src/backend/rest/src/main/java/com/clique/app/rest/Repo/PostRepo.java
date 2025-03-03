package com.clique.app.rest.Repo;

import com.clique.app.rest.Models.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepo extends JpaRepository<Post, Long> {
}
