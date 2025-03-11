package com.clique.app.rest.Repo;

import com.clique.app.rest.Models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepo extends JpaRepository<Comment, Long> {
}
