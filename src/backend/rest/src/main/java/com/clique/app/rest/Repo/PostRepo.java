package com.clique.app.rest.Repo;

import com.clique.app.rest.Models.Post;
import com.clique.app.rest.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface PostRepo extends JpaRepository<Post, Long> {
    List<Post> findByAuthorId(Long authorId);

    Optional<Post> findByIdAndAuthorId(Long postId, Long authorId);
    List<Post> findByAuthorInOrderByCreatedAtDesc(Set<User> authors);


}
