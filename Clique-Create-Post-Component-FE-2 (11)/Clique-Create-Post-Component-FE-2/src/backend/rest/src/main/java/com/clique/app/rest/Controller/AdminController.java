package com.clique.app.rest.Controller;

import com.clique.app.rest.Models.Admin;
import com.clique.app.rest.Models.User;
import com.clique.app.rest.Repo.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
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
}
