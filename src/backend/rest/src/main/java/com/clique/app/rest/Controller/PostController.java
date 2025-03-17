package com.clique.app.rest.Controller;

import com.clique.app.rest.Models.Post;
import com.clique.app.rest.Models.User;
import com.clique.app.rest.Repo.PostRepo;
import com.clique.app.rest.Repo.UserRepo;
import com.clique.app.rest.Service.FileStorageSystem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostRepo postRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private FileStorageSystem fileStorageSystem;

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
    public String createPost(
            @RequestParam("file") MultipartFile file,
            @RequestParam("content") String content,
            @RequestParam("authorId") Long authorId) {

        // Check if the user exists
        User author = userRepo.findById(authorId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Store the file and get its filename
        String fileName;
        try {
            fileName = fileStorageSystem.storeFile(file);
        } catch (IOException e) {
            return "File upload failed: " + e.getMessage();
        }

        // Create and save the post
        Post post = new Post();
        post.setAuthor(author);
        post.setContent(content);
        post.setMediaFileName(fileName); // Store filename instead of full URL
        post.setCreatedAt(LocalDateTime.now());

        postRepo.save(post);

        return "Post created successfully!";
    }

    // Update an existing post by ID
   /* @PutMapping("/{id}")
    public String updatePost(@PathVariable Long id, @RequestBody Post postDetails) {
        Post post = postRepo.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        post.setContent(postDetails.getContent());
        post.setMediaURL(postDetails.getMediaURL());
        post.setShareCount(postDetails.getShareCount());

        postRepo.save(post);
        return "Post updated successfully!";
    } */

    // Delete a post by ID
    @DeleteMapping("/{id}")
    public String deletePost(@PathVariable Long id) {
        Post post = postRepo.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        postRepo.delete(post);
        return "Post deleted successfully!";
    }
}