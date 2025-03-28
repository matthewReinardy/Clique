package com.clique.app.rest.Controller;

import com.clique.app.rest.Models.User;
import com.clique.app.rest.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepo userRepo;

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        User existingUser = userRepo.findByUsername(user.getUsername());

        if (existingUser == null) {
            return "User not found";
        }

        return "Login successful";
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {

        if (user.getFirstName() == null || user.getLastName() == null) {
            return "First name and last name are required";
        }

        if (userRepo.findByUsername(user.getUsername()) != null) {
            return "Username already in use";
        }

        if (userRepo.findByEmail(user.getEmail()) != null) {
            return "Email already in use";
        }

        userRepo.save(user);

        return "Registration successful";
    }
}
