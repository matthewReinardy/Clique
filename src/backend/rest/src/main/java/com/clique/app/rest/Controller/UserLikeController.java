package com.clique.app.rest.Controller;

import com.clique.app.rest.Models.Response.UserDTO;
import com.clique.app.rest.Service.UserLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/likes")
public class UserLikeController {

    private final UserLikeService userLikeService;

    @PostMapping("/post/{postId}")
    public ResponseEntity<List<UserDTO>> toggleLike(@RequestParam Long userId, @PathVariable Long postId) {
        List<UserDTO> likedUsers = userLikeService.toggleLike(userId, postId);
        return ResponseEntity.ok(likedUsers);
    }


    @PostMapping("/comment/{commentId}")
    public ResponseEntity<?> likeComment(@RequestParam Long userId, @PathVariable Long commentId) {
        userLikeService.likeComment(userId, commentId);
        return ResponseEntity.ok("Liked comment");
    }
}