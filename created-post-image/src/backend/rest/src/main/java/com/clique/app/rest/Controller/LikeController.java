package com.clique.app.rest.Controller;

import com.clique.app.rest.Models.Comment;
import com.clique.app.rest.Models.Post;
import com.clique.app.rest.Models.User;
import com.clique.app.rest.Models.UserLike;
import com.clique.app.rest.Repo.CommentRepo;
import com.clique.app.rest.Repo.PostRepo;
import com.clique.app.rest.Repo.UserLikeRepo;
import com.clique.app.rest.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/likes")
public class LikeController {

    // Connecting to the userLike Repository
    @Autowired
    private UserLikeRepo userLikeRepo;

    // Connecting to the User Repo
    @Autowired
    private UserRepo userRepo;

    // Connecting to the Post Repo
    @Autowired
    private PostRepo postRepo;

    // Connecting to the Comment Repo
    @Autowired
    private CommentRepo commentRepo;

    // Endpoint to like either a comment or post, using same method since it is practically the same thing
    // Taking in 3 things: user_Id, post_Id OR comment_Id, and likeType
    @PostMapping
    public UserLike likeContent(@RequestParam("user_id") Long userId,
                                @RequestParam(value = "post_id", required = false) Long postId,
                                @RequestParam(value = "comment_id", required = false) Long commentId,
                                @RequestParam("likeType") String likeType) {

        // Fetch the user from the DB who is making the like
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        // If likeType is for a post, handle liking a post
        if ("POST".equals(likeType)) {

            // Obtain the post the user is attempting to like
            Post post = postRepo.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));

            // Return the helper method to actually save liking the post
            return createUserLike(user, post, null, UserLike.LikeType.POST);
        }

        // Exact same thing but with comment
        else if ("COMMENT".equals(likeType)) {
            Comment comment = commentRepo.findById(commentId).orElseThrow(() -> new RuntimeException("Comment not found"));
            return createUserLike(user, null, comment, UserLike.LikeType.COMMENT);
        }

        throw new RuntimeException("Invalid likeType");
    }

    private UserLike createUserLike(User user, Post post, Comment comment, UserLike.LikeType likeType) {
        UserLike userLike = new UserLike();
        userLike.setUser(user);
        userLike.setPost(post);
        userLike.setComment(comment);
        userLike.setType(likeType);
        userLike.setCreatedAt(LocalDateTime.now());

        return userLikeRepo.save(userLike);
    }
}
