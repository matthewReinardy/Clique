package com.clique.app.rest.Controller;

import com.clique.app.rest.Models.User;
import com.clique.app.rest.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping(value = "/save", consumes = "multipart/form-data")
    public ResponseEntity<User> saveUser(
            @RequestParam(value = "firstName", required = false) String firstName,
            @RequestParam(value = "lastName", required = false) String lastName,
            @RequestParam(value = "username", required = true) String username,
            @RequestParam(value = "email", required = true) String email,
            @RequestParam(value = "password", required = false) String password,

            // Change profilePicture from String to MultipartFile
            @RequestParam(value = "profilePicture", required = false) MultipartFile profilePicture,

            @RequestParam(value = "phoneNumber", required = false) String phoneNumber,
            @RequestParam(value = "dateOfBirth", required = false) String dateOfBirth,
            @RequestParam(value = "bio", required = false) String bio,
            @RequestParam(value = "location", required = false) String location,
            @RequestParam(value = "isPrivate", required = false) Boolean isPrivate,
            @RequestParam(value = "isVerified", required = false) Boolean isVerified,
            @RequestParam(value = "accountType", required = false) String accountType,
            @RequestParam(value = "interests", required = false) List<String> interests
    ) {
        try {

            // Create a new User object
            User user = new User();
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.setUsername(username);
            user.setEmail(email);
            user.setPassword(password);
            user.setPhoneNumber(phoneNumber);
            user.setDateOfBirth(dateOfBirth);
            user.setBio(bio);
            user.setLocation(location);
            user.setIsPrivate(isPrivate);
            user.setIsVerified(isVerified);
            user.setAccountType(accountType);
            user.setInterests(interests);

            // Set default values for counts
            user.setFollowerCount(0);
            user.setFollowingCount(0);
            user.setPostCount(0);

            // Set default values for flags
            user.setActive(true);
            user.setSuspended(false);

            // Process profile picture if provided
            if (profilePicture != null && !profilePicture.isEmpty()) {
                user.setPfpImage(profilePicture.getBytes());
            }

            // Save the user (Assuming a UserService exists)
            User savedUser = userRepo.save(user);

            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PutMapping(value = "update/{id}", consumes = "multipart/form-data")
    public ResponseEntity<Map<String, String>> updateUser(
            @PathVariable String id,
            @RequestParam(value = "firstName", required = false) String firstName,
            @RequestParam(value = "lastName", required = false) String lastName,
            @RequestParam(value = "username", required = false) String username,
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "password", required = false) String password,
            @RequestParam(value = "profilePicture", required = false) MultipartFile profilePicture,
            @RequestParam(value = "phoneNumber", required = false) String phoneNumber,
            @RequestParam(value = "dateOfBirth", required = false) String dateOfBirth,
            @RequestParam(value = "bio", required = false) String bio,
            @RequestParam(value = "location", required = false) String location,
            @RequestParam(value = "isPrivate", required = false) Boolean isPrivate,
            @RequestParam(value = "isVerified", required = false) Boolean isVerified,
            @RequestParam(value = "accountType", required = false) String accountType,
            @RequestParam(value = "interests", required = false) List<String> interests,
            @RequestParam(value = "followerCount", required = false) Integer followerCount,
            @RequestParam(value = "followingCount", required = false) Integer followingCount,
            @RequestParam(value = "postCount", required = false) Integer postCount) {

        try {
            Long userId = Long.parseLong(id);

            // Check if user exists
            Optional<User> existingUserOptional = userRepo.findById(userId);
            if (existingUserOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.singletonMap("message", "User not found"));
            }

            User updatedUser = existingUserOptional.get();

            // Only update fields that were provided (not null)
            if (firstName != null) updatedUser.setFirstName(firstName);
            if (lastName != null) updatedUser.setLastName(lastName);
            if (username != null) updatedUser.setUsername(username);
            if (email != null) updatedUser.setEmail(email);
            if (password != null) updatedUser.setPassword(password);
            if (phoneNumber != null) updatedUser.setPhoneNumber(phoneNumber);
            if (dateOfBirth != null) updatedUser.setDateOfBirth(dateOfBirth);
            if (bio != null) updatedUser.setBio(bio);
            if (location != null) updatedUser.setLocation(location);
            if (isPrivate != null) updatedUser.setIsPrivate(isPrivate);
            if (isVerified != null) updatedUser.setIsVerified(isVerified);
            if (accountType != null) updatedUser.setAccountType(accountType);
            if (interests != null) updatedUser.setInterests(interests);
            if (followerCount != null) updatedUser.setFollowerCount(followerCount);
            if (followingCount != null) updatedUser.setFollowingCount(followingCount);
            if (postCount != null) updatedUser.setPostCount(postCount);

            // Process profile picture if provided
            if (profilePicture != null && !profilePicture.isEmpty()) {
                try {
                    updatedUser.setPfpImage(profilePicture.getBytes());
                } catch (Exception e) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(Collections.singletonMap("message", "Failed to process profile picture: " + e.getMessage()));
                }
            }

            // Save the updated user to the database
            userRepo.save(updatedUser);
            return ResponseEntity.ok(Collections.singletonMap("message", "User updated successfully!"));
        } catch (NumberFormatException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("message", "Invalid user ID format"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("message", "Failed to update user: " + e.getMessage()));
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

