package com.clique.app.rest.Controller;

import com.clique.app.rest.Models.Post;
import com.clique.app.rest.Models.Response.PostFeedDto;
import com.clique.app.rest.Service.FeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/feed")
public class FeedController {

    private final FeedService feedService;

    @GetMapping
    public ResponseEntity<List<PostFeedDto>> getFeed(@RequestParam Long userId) {
        return ResponseEntity.ok(feedService.getUserFeed(userId));
    }

}