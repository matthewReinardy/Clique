package com.clique.app.rest.Repo;

import com.clique.app.rest.Models.Ad;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdRepo extends JpaRepository<Ad, Long> {
}
