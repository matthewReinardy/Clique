package com.clique.app.rest.Controller;

import com.clique.app.rest.Models.User;
import com.clique.app.rest.Repo.UserRepo;
import com.clique.app.rest.Service.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/follows")
public class FollowController {

    @Autowired
    private FollowService followService;

    // Takes in 2 params, the user who is making the follow and who is getting followed
    @PostMapping("/{currentUserId}/follow/{targetUserId}")

    // I put all the logic in the FollowService class to improve readability
    public ResponseEntity<User> followUser(
            @PathVariable Long currentUserId,
            @PathVariable Long targetUserId) {
        User updatedUser = followService.followUser(currentUserId, targetUserId);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @PostMapping("/{currentUserId}/unfollow/{targetUserId}")
    public ResponseEntity<User> unfollowUser(
            @PathVariable Long currentUserId,
            @PathVariable Long targetUserId) {
        User updatedUser = followService.unfollowUser(currentUserId, targetUserId);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }
}
