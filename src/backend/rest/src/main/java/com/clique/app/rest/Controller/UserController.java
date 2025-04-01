package com.clique.app.rest.Controller;

import com.clique.app.rest.Models.User;
import com.clique.app.rest.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;
import java.util.Map;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    // Referencing the repository
    @Autowired
    private UserRepo userRepo;

    // Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    // Find the user by the ID
    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable String id) {
        Long userId = Long.parseLong(id);
        return userRepo.findById(userId);
    }

    // Creating a new user
    @PostMapping(value = "/save")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        User savedUser = userRepo.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }
    

    // Updating a user
    @PutMapping(value = "update/{id}")
    public ResponseEntity<String> updateUser(@PathVariable String id, @RequestBody User user) {
        try {
            Long userId = Long.parseLong(id);

            // Check if user exists
            Optional<User> existingUserOptional = userRepo.findById(userId);
            if (existingUserOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            User updatedUser = existingUserOptional.get();
            updatedUser.setFirstName(user.getFirstName());
            updatedUser.setLastName(user.getLastName());
            updatedUser.setPhoneNumber(user.getPhoneNumber());
            updatedUser.setDateOfBirth(user.getDateOfBirth());
            updatedUser.setBio(user.getBio());
            updatedUser.setLocation(user.getLocation());
            updatedUser.setUsername(user.getUsername());
            updatedUser.setEmail(user.getEmail());
            updatedUser.setPassword(user.getPassword());
            updatedUser.setIsPrivate(user.getIsPrivate());
            updatedUser.setIsVerified(user.getIsVerified());
            updatedUser.setProfilePicture(user.getProfilePicture());
            updatedUser.setAccountType(user.getAccountType());
            // updatedUser.setInterests(user.getInterests());
            updatedUser.setFollowerCount(user.getFollowerCount());
            updatedUser.setFollowingCount(user.getFollowingCount());
            updatedUser.setPostCount(user.getPostCount());

            // Save the updated user to the database
            userRepo.save(updatedUser);
            return ResponseEntity.ok("User updated successfully!");
        } catch (NumberFormatException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user ID format");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update user: " + e.getMessage());
        }
    }

    //Deleting a user
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable String id) {
        Long userId = Long.parseLong(id);
        Optional<User> userOptional = userRepo.findById(userId);

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("message", "User not found"));
        }

        try {
            userRepo.delete(userOptional.get());
            return ResponseEntity.ok(Collections.singletonMap("message", "User deleted successfully!"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("message", "Failed to delete user"));
        }
    }

}

