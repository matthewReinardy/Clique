package com.clique.app.rest.Controller;

import com.clique.app.rest.Models.Post;
import com.clique.app.rest.Models.User;
import com.clique.app.rest.Repo.PostRepo;
import com.clique.app.rest.Repo.UserRepo;
import com.clique.app.rest.Service.FileStorageSystem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    /* FOR TESTING THE BASE 64 IMG

    https://base64.guru/converter/decode/image

    */

    // Get a single post by ID
    @GetMapping("/{id}")
    public Optional<Post> getPostById(@PathVariable Long id) {
        return postRepo.findById(id);
    }

    // Create a new post
    @PostMapping("/save")
    public ResponseEntity<?> createPost(
            // Takes in 5 params
            @RequestParam("file") MultipartFile file,
            @RequestParam("caption") String caption,
            @RequestParam("location") String location,
            @RequestParam(value = "tags", required = false) List<String> tags,
            @RequestParam("tag") String tag,
            @RequestParam("authorId") Long authorId) {
        try {
            // Check if the user exists
            User author = userRepo.findById(authorId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // This is when we read the image that was uploaded, and turning it into a byte array, which that is what we
            // will store in the DB
            byte[] imageData = file.getBytes();

            Post post = new Post();
            post.setAuthor(author);
            post.setCaption(caption);
            post.setLocation(location);
            if (tags != null) {
                post.setTags(tags);
            }
            post.setImage(imageData);
            post.setCreatedAt(LocalDateTime.now());

            // Save the post to the DB
            postRepo.save(post);
            return ResponseEntity.ok().body("Post created successfully");

            /* First try catch handles for the image being too large,
                network issues, and the file format is unsupported.
                Example return for a file being too large (JSON formatted)

                {
                    "message": "Failed to process image Java.io.IOException: File too large"
                }
            */
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to process image " + e.getMessage());
        }

        /* This catch is for the user not existing who made the post */
        catch (RuntimeException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }


    // Update a post by its ID
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(@PathVariable Long id, @RequestBody Post postDetails) {
        try {

            // Find the post we are trying to modify, if none, throw a 404
            Post post = postRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Post not found"));

            // Update the post caption
            if (postDetails.getCaption() != null) {
                post.setCaption(postDetails.getCaption());
            }

            // Update the location
            if (postDetails.getLocation() != null) {
                post.setLocation(postDetails.getLocation());
            }

            // Upadte the tags
            if (postDetails.getTags() != null) {
                post.setTags(postDetails.getTags());
            }


            // Save the modified post to the DB
            Post updatedPost = postRepo.save(post);
            return ResponseEntity.ok().body(updatedPost);
        } catch(RuntimeException e) {
            return ResponseEntity.status(404).body("Error: " + e.getMessage());
        }
    }

    // Delete a post by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id) {
        try {
            // Find the post we are deleting
            Post post = postRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Post not found"));
            // If post is found, delete it
            postRepo.delete(post);
            return ResponseEntity.ok().body("Post deleted successfully");
        } catch(RuntimeException e) {
            // If not return a 404
            return ResponseEntity.status(404).body("Error: " + e.getMessage());
        }


    }
}