package com.clique.app.rest.Controller;

import com.clique.app.rest.Controller.DTOs.PostDTO;
import com.clique.app.rest.Models.Post;
import com.clique.app.rest.Models.User;
import com.clique.app.rest.Models.Ad;
import com.clique.app.rest.Repo.AdRepo;
import com.clique.app.rest.Repo.PostRepo;
import com.clique.app.rest.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@RestController
@RequestMapping("/feed")
public class FeedController {

    // Connect to the repos
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PostRepo postRepo;

    @Autowired
    private AdRepo adRepo;


    // Endpoint for getting a feed for a user, the user you pass in will return the feed for who they follow
    @GetMapping("/{userId}")
    public ResponseEntity<?> getFeed(@PathVariable Long userId) {
        try {

            // Find the user that was passed
            User currentUser = userRepo.findById(userId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found"));

            // Get all of the users that the user that was passed in is following, these will be unique, so using a set
            Set<User> following = currentUser.getFollowing();

            if (following.isEmpty()) {
                // Do something, maybe prompt them to follow other users... idk
            }


            // Get all of the posts from the user set
            // Storing them in a list since there can be duplicates

            List<Post> feedPosts = new ArrayList<>();
            List<PostDTO> feedDTOs = new ArrayList<>();
            for (User followedUser : following) {
                List<Post> userPosts = postRepo.findByAuthor(followedUser);
                feedPosts.addAll(userPosts);

                // Check if the followed user is a business account, and show ads if they are
                if ("Business".equalsIgnoreCase(followedUser.getAccountType())) {
                    List<Ad> ads = adRepo.findByUser(followedUser);
                    if (ads != null) {
                        for (Ad ad : ads) {
                                PostDTO adDto = new PostDTO(
                                        ad.getId(),
                                        "Sponsored", // caption for all ads
                                        null,         // null location
                                        null,         // null tag
                                        "",           // empty creation date
                                        ad.getUser().getUsername(),
                                        0,            // default likes and comments
                                        0,
                                        ad.getImage()
                                );
                                feedDTOs.add(adDto); // Add the ad to the feedDTOs list

                        }
                    }
                }
            }

            Collections.sort(feedPosts, new Comparator<Post>() {
                @Override
                public int compare(Post post1, Post post2) {
                    return post2.getCreatedAt().compareTo(post1.getCreatedAt());
                }
            });
            // Convert to DTOs
            for (Post post : feedPosts) {
                PostDTO dto = new PostDTO(
                        post.getId(),
                        post.getCaption(),
                        post.getLocation(),
                        post.getTag(),
                        post.getCreatedAt().toString(),
                        post.getAuthor().getUsername(),
                        post.getLikeCount(),
                        post.getCommentCount(),
                        post.getImage()
                );
                feedDTOs.add(dto);
            }

            return ResponseEntity.ok().body(feedDTOs);
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving feed: " + e.getMessage());
        }
    }
}
