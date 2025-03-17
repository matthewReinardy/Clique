package com.clique.app.rest.Controller;

import com.clique.app.rest.Models.User;
import com.clique.app.rest.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    // Creating a new user
    @PostMapping(value = "/save")
    public String saveUser(@RequestBody User user) {
        userRepo.save(user);
        return "Saved...";
    }

    // Updating a user
    @PutMapping(value = "update/{id}")
    public String updateUser(@PathVariable Long id, @RequestBody User user) {
        User updatedUser = userRepo.findById(id).get();
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
        updatedUser.setInterests(user.getInterests());
        updatedUser.setFollowerCount(user.getFollowerCount());
        updatedUser.setFollowingCount(user.getFollowingCount());
        updatedUser.setPostCount(user.getPostCount());

        // Save the updated user to the database
        userRepo.save(updatedUser);
        return "User updated successfully!";
    }

    // Deleting a user
    @DeleteMapping(value = "/delete/{id}")
    public String deleteUser(@PathVariable Long id) {
        User deletedUser = userRepo.findById(id).get();
        userRepo.delete(deletedUser);
        return "Delete user with the id " + id + " successfully!";
    }
}
