package com.clique.app.rest.Controller;

import com.clique.app.rest.Service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/follow")
public class FollowController {

    private final FollowService followService;

    @PostMapping("/{targetUserId}")
    public ResponseEntity<?> follow(@RequestParam Long userId, @PathVariable Long targetUserId) {
        followService.follow(userId, targetUserId);
        return ResponseEntity.ok("Followed");
    }

    @DeleteMapping("/{targetUserId}")
    public ResponseEntity<?> unfollow(@RequestParam Long userId, @PathVariable Long targetUserId) {
        followService.unfollow(userId, targetUserId);
        return ResponseEntity.ok("Unfollowed");
    }
}