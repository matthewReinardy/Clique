package com.clique.app.rest.Repo;

import com.clique.app.rest.Models.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepo extends JpaRepository<Admin, Long> {
    Admin findByUsername(String username);
}
