package com.clique.app.rest.Repo;

import com.clique.app.rest.Models.UserLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserLikeRepo extends JpaRepository<UserLike, Long> {
}
