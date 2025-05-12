package com.clique.app.rest.Controller;

import com.clique.app.rest.Models.User;
import com.clique.app.rest.Repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/profile")
public class ProfileController {


    private final UserRepo userRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> getProfile(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        Map<String, Object> profile = new HashMap<>();
        profile.put("username", user.getUsername());
        profile.put("followers", user.getFollowerCount());
        profile.put("following", user.getFollowingCount());
        profile.put("posts", user.getPostCount());
        return ResponseEntity.ok(profile);
    }
}
