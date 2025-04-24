package com.clique.app.rest.Controller;

import com.clique.app.rest.Models.Post;
import com.clique.app.rest.Models.Request.PostCreateRequest;
import com.clique.app.rest.Models.User;
import com.clique.app.rest.Repo.PostRepo;
import com.clique.app.rest.Repo.UserRepo;
import com.clique.app.rest.Service.FileStorageSystem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostRepo postRepository;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private FileStorageSystem fileStorageSystem;

    @PostMapping(value = "/{userId}", consumes = {"multipart/form-data"})
    public Post createPost(@PathVariable Long userId,@RequestBody @ModelAttribute PostCreateRequest postRequest) throws IOException {
        User author = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = new Post();
        post.setAuthor(author);
        post.setContent(postRequest.getContent());
        post.setTags(postRequest.getTags());
        post.setLocation(postRequest.getLocation());
        post.setShareCount(0);

/*        MultipartFile file = postRequest.getMediaFile();
        if (file != null && !file.isEmpty()) {
            String fileName = fileStorageSystem.storeFile(file);
            post.setMediaFileName(fileName);
        }*/
        MultipartFile file = postRequest.getMediaFile();
        if (file != null && !file.isEmpty()) {
            post.setMediaFileName(file.getOriginalFilename());
            post.setMediaFileData(file.getBytes());
        }
        return postRepository.save(post);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Post>> getPostsByUserId(@PathVariable Long userId) {
        List<Post> posts = postRepository.findByAuthorId(userId);
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/user/{userId}/post/{postId}")
    public ResponseEntity<Post> getPostByUserAndPostId(@PathVariable Long userId, @PathVariable Long postId) {
        Post post = postRepository.findByIdAndAuthorId(postId, userId)
                .orElseThrow(() -> new RuntimeException("Post not found for user"));
        return ResponseEntity.ok(post);
    }
    @PatchMapping(value = "/{userId}/{postId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Post> updatePost(
            @PathVariable Long userId,
            @PathVariable Long postId,
            @ModelAttribute PostCreateRequest postRequest) throws IOException {

        Post existingPost = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        if (!existingPost.getAuthor().getId().equals(userId)) {
            throw new RuntimeException("This post does not belong to the user");
        }

        if (postRequest.getContent() != null) {
            existingPost.setContent(postRequest.getContent());
        }

        if (postRequest.getLocation() != null) {
            existingPost.setLocation(postRequest.getLocation());
        }

        if (postRequest.getTags() != null) {
            existingPost.setTags(postRequest.getTags());
        }

        MultipartFile file = postRequest.getMediaFile();
        if (file != null && !file.isEmpty()) {
            existingPost.setMediaFileName(file.getOriginalFilename());
            existingPost.setMediaFileData(file.getBytes());
        }

        Post updatedPost = postRepository.save(existingPost);
        return ResponseEntity.ok(updatedPost);
    }
    @DeleteMapping("/{userId}/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable Long userId, @PathVariable Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        if (!post.getAuthor().getId().equals(userId)) {
            throw new RuntimeException("This post does not belong to the user");
        }
        post.setMediaFileData(null);
        post.setMediaFileName(null);
        postRepository.delete(post); // or deleteById(postId) directly
        return ResponseEntity.ok("Post deleted successfully");
    }



//    @DeleteMapping("/{userId}/{postId}")
//    public ResponseEntity<String> deletePost(@PathVariable Long userId, @PathVariable Long postId) {
//        Post post = postRepository.findById(postId)
//                .orElseThrow(() -> new RuntimeException("Post not found"));
//        if (!post.getAuthor().getId().equals(userId)) {
//            throw new RuntimeException("This post does not belong to the user");
//        }
//        if (post.getMediaFileName() != null) {
//            fileStorageSystem.deleteFile(post.getMediaFileName());
//        }
//        postRepository.deleteById(postId);
//        return ResponseEntity.ok("Post and image deleted successfully");
//    }

}