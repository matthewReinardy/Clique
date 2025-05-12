package com.clique.app.rest.Repo;

import com.clique.app.rest.Models.Comment;
import com.clique.app.rest.Models.Post;
import com.clique.app.rest.Models.User;
import com.clique.app.rest.Models.UserLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserLikeRepo extends JpaRepository<UserLike, Long> {
    boolean existsByUserAndPost(User user, Post post);
    boolean existsByUserAndComment(User user, Comment comment);
    Optional<UserLike> findByUserAndPost(User user, Post post);
    List<UserLike> findByPost(Post post);

}
