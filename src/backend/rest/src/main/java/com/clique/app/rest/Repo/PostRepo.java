package com.clique.app.rest.Repo;

import com.clique.app.rest.Models.Post;
import com.clique.app.rest.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepo extends JpaRepository<Post, Long> {
    List<Post> findByAuthor(User author);
    List<Post> findAllByOrderByCreatedAtDesc();
}
