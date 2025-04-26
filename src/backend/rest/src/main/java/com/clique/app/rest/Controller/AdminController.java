package com.clique.app.rest.Controller;

import com.clique.app.rest.Models.Admin;
import com.clique.app.rest.Models.User;
import com.clique.app.rest.Repo.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminRepo adminRepo;
    // get all the admins
    // realistically, we only NEED one, but i may make two as a *backup*
    @GetMapping
    public List<Admin> getAllAdmins() {
        return adminRepo.findAll();
    }

    // create an Admin
    @PostMapping(value = "/save")
    public String saveAdmin(@RequestBody Admin admin) {
        adminRepo.save(admin);
        return "Saved...";
    }

    // get admin by ID
    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdminById(@PathVariable Long id) {
        Optional<Admin> admin = adminRepo.findById(id);

        if (admin.isPresent()) {
            return new ResponseEntity<>(admin.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

};
