package com.clique.app.rest.Controller;

import com.clique.app.rest.Models.User;
import com.clique.app.rest.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ApiControllers {

    // Creating a
    @Autowired
    private UserRepository userRepository;

    // GetMapping annotation maps to the HTTP GET request
    // Get
    //@GetMapping(value = "/")
    //public String getPage() {
    //    return "Welcome";
    //}

    // Returning a list of all of the current users
    // Using HTTP GET request to "/users"
    @GetMapping(value = "/users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    // Maps to HTTP POST, creates a new user with a confirmation message
    @PostMapping(value = "/save")
    public String saveUser(@RequestBody User user) {
         userRepository.save(user);
        return "Saved...";
    }

    // Put HTTP Request, updates the user data with the specified id in "update/{id}"
    @PutMapping(value = "update/{id}")
    public String updateUser(@PathVariable Long id, @RequestBody User user) {
        User updatedUser = userRepository.findById(id).get();
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
        userRepository.save(updatedUser);

        return "User updated successfully!";

    }

    // Delete HTTP Request, deleting by which id is provided in "/delete/{id}
    @DeleteMapping(value = "/delete/{id}")
    public String deleteUser(@PathVariable Long id) {
        User deletedUser = userRepository.findById(id).get();
        userRepository.delete(deletedUser);
        return "Delete user with the id " + id + " successfully!";
    }
}
