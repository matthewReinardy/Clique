package com.clique.app.rest.Controller;

import com.clique.app.rest.Models.Comment;
import com.clique.app.rest.Models.Post;
import com.clique.app.rest.Models.User;
import com.clique.app.rest.Repo.CommentRepo;
import com.clique.app.rest.Repo.PostRepo;
import com.clique.app.rest.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentRepo commentRepo;

    @Autowired
    private PostRepo postRepo;

    @Autowired
    private UserRepo userRepo;

    // Get all comments
    @GetMapping
    public List<Comment> getAllComments() {
        return commentRepo.findAll();
    }

    // Get a comment by a single id
    @GetMapping("/{id}")
    public Optional<Comment> getCommentById(@PathVariable Long id) {
        return commentRepo.findById(id);
    }

    // Create a comment (refer to JSON templates for template)
    @PostMapping("/save")
    public String createComment(@RequestBody Comment comment) {
        // Fetch the user by their ID (authorId)
        User author = userRepo.findById(comment.getAuthorId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Fetch the post by its ID
        Post post = postRepo.findById(comment.getPost().getId())
                .orElseThrow(() -> new RuntimeException("Post not found"));

        comment.setPost(post);
        commentRepo.save(comment);

        return "Comment created";
    }

    // Edit a comment
    @PutMapping("/{id}")
    public String editComment(@PathVariable Long id, @RequestBody Comment updatedComment) {
        // Fetch the comment by its ID
        Comment existingComment = commentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        // You can update the content or other fields of the existing comment
        existingComment.setContent(updatedComment.getContent());

        // Save the updated comment back to the database
        commentRepo.save(existingComment);

        return "Comment updated successfully";
    }

    @DeleteMapping("/{id}")
    public String deleteComment(@PathVariable Long id) {
        commentRepo.deleteById(id);
        return "Comment deleted";
    }
}
