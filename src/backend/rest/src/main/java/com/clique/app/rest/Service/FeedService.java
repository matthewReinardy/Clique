package com.clique.app.rest.Service;

import com.clique.app.rest.Models.Post;
import com.clique.app.rest.Models.Response.PostFeedDto;
import com.clique.app.rest.Models.User;
import com.clique.app.rest.Repo.PostRepo;
import com.clique.app.rest.Repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FeedService {


    private final PostRepo postRepository;
    private final UserRepo userRepository;

    public List<PostFeedDto> getUserFeed(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Post> posts = postRepository.findByAuthorInOrderByCreatedAtDesc(user.getFollowing());

        return posts.stream().map(post -> {
            User author = post.getAuthor();
            return new PostFeedDto(
                    post.getId(),
                    post.getContent(),
                    post.getMediaFileName(),
                    post.getMediaFileData(),
                    post.getCreatedAt(),
                    post.getCommentCount(),
                    post.getLikeCount(),

                    author.getId(),
                    author.getUsername(),
                    author.getFirstName(),
                    author.getLastName(),
                    author.getProfilePicture()
            );
        }).toList();
    }

}
