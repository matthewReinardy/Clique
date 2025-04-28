package com.clique.app.rest.Controller;

import com.clique.app.rest.Models.Admin;
import com.clique.app.rest.Models.User;
import com.clique.app.rest.Repo.AdminRepo;
import com.clique.app.rest.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AdminRepo adminRepo;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        String username = request.get("username");

        //Check within Users
        User existingUser = userRepo.findByUsername(username);
        if (existingUser != null) {
            response.put("success", true);
            response.put("data", existingUser);
            return ResponseEntity.ok(response);
        }

        //If not found within Users, check Admin
        Admin existingAdmin = adminRepo.findByUsername(username);
        if (existingAdmin != null) {
            response.put("success", true);
            response.put("data", existingAdmin);
            return ResponseEntity.ok(response);
        }

        //If no match found
        response.put("success", false);
        response.put("message", "User not found");
        return ResponseEntity.status(404).body(response);
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();

        if (user.getFirstName() == null || user.getLastName() == null) {
            response.put("success", false);
            response.put("message", "First name and last name are required");
            return ResponseEntity.badRequest().body(response);
        }

        if (userRepo.findByUsername(user.getUsername()) != null) {
            response.put("success", false);
            response.put("message", "Username already in use");
            return ResponseEntity.badRequest().body(response);
        }

        if (userRepo.findByEmail(user.getEmail()) != null) {
            response.put("success", false);
            response.put("message", "Email already in use");
            return ResponseEntity.badRequest().body(response);
        }

        User savedUser = userRepo.save(user);

        response.put("success", true);
        response.put("data", savedUser);
        return ResponseEntity.ok(response);
    }
}
