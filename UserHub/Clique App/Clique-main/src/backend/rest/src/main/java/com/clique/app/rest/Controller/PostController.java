package com.clique.app.rest.Controller;

import com.clique.app.rest.Models.Post;
import com.clique.app.rest.Models.User;
import com.clique.app.rest.Repository.PostRepo;
import com.clique.app.rest.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostRepo postRepo;

    @Autowired
    private UserRepository userRepository;

    // Get all posts
    @GetMapping
    public List<Post> getAllPosts() {
        return postRepo.findAll();
    }

    // Get a single post by ID
    @GetMapping("/{id}")
    public Optional<Post> getPostById(@PathVariable Long id) {
        return postRepo.findById(id);
    }

    // Create a new post (Fix the mapping here)
    @PostMapping("/save")
    public String createPost(@RequestBody Post post) {
        // Check if the user exists
        User author = userRepository.findById(post.getAuthor().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        post.setAuthor(author);
        post.setCreatedAt(LocalDateTime.now()); // Set this if @PrePersist isn't working
        postRepo.save(post);

        return "Post created successfully!";
    }

    // Update an existing post by ID
    @PutMapping("/{id}")
    public String updatePost(@PathVariable Long id, @RequestBody Post postDetails) {
        Post post = postRepo.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        post.setContent(postDetails.getContent());
        post.setMediaURL(postDetails.getMediaURL());
        post.setShareCount(postDetails.getShareCount());

        postRepo.save(post);
        return "Post updated successfully!";
    }

    // Delete a post by ID
    @DeleteMapping("/{id}")
    public String deletePost(@PathVariable Long id) {
        Post post = postRepo.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        postRepo.delete(post);
        return "Post deleted successfully!";
    }
}