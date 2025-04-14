package com.clique.app.rest.Service;

import com.clique.app.rest.Models.User;
import com.clique.app.rest.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class FollowService {

    // Connecting to the user repo
    @Autowired
    private UserRepo userRepository;


    public User followUser(Long currentUserId, Long targetUserId) {

        // This prevents the user from following themselves
        if (currentUserId.equals(targetUserId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You can't follow this user");
        }

        // The user does not exist whom is trying to make the post
        User currentUser = userRepository.findById(currentUserId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Current user not found"));

        // Same thing for who is being followed
        User targetUser = userRepository.findById(targetUserId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Target user not found"));

        // Checking if they already follow this user
        if (currentUser.getFollowing().contains(targetUser)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Already following this user");
        }

        // At this point we are good logic wise, can continue on to add to the DB
        currentUser.getFollowing().add(targetUser);

        // Updating the following count, for the count at the top of your profile page
        currentUser.setFollowingCount(currentUser.getFollowingCount() + 1);

        // The same but for followers
        targetUser.getFollowers().add(currentUser);
        targetUser.setFollowerCount(targetUser.getFollowerCount() + 1);

        userRepository.save(currentUser);
        return userRepository.save(targetUser);
    }

    // The logic for unfollowing is effectively the same, instead we are decreasing the counts
    public User unfollowUser(Long currentUserId, Long targetUserId) {
        if (currentUserId.equals(targetUserId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You cannot unfollow yourself");
        }

        User currentUser = userRepository.findById(currentUserId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Current user not found"));

        User targetUser = userRepository.findById(targetUserId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Target user not found"));

        if (!currentUser.getFollowing().contains(targetUser)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not following this user");
        }

        currentUser.getFollowing().remove(targetUser);
        currentUser.setFollowingCount(currentUser.getFollowingCount() - 1);

        targetUser.getFollowers().remove(currentUser);
        targetUser.setFollowerCount(targetUser.getFollowerCount() - 1);

        // Save both users
        userRepository.save(targetUser);
        return userRepository.save(currentUser);
    }
}
