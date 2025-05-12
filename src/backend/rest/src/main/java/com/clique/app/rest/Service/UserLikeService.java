package com.clique.app.rest.Service;

import com.clique.app.rest.Models.Comment;
import com.clique.app.rest.Models.Post;
import com.clique.app.rest.Models.Response.UserDTO;
import com.clique.app.rest.Models.User;
import com.clique.app.rest.Models.UserLike;
import com.clique.app.rest.Repo.CommentRepo;
import com.clique.app.rest.Repo.PostRepo;
import com.clique.app.rest.Repo.UserLikeRepo;
import com.clique.app.rest.Repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserLikeService {

    private final UserLikeRepo userLikeRepository;
    private final UserRepo userRepository;
    private final PostRepo postRepository;
    private final CommentRepo commentRepository;

    public List<UserDTO> toggleLike(Long userId, Long postId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));

        Optional<UserLike> existingLike = userLikeRepository.findByUserAndPost(user, post);

        if (existingLike.isPresent()) {
            // Unlike
            userLikeRepository.delete(existingLike.get());
        } else {
            // Like
            UserLike like = new UserLike();
            like.setUser(user);
            like.setPost(post);
            like.setType(UserLike.LikeType.POST);
            userLikeRepository.save(like);
        }

        // Return updated list of users who liked this post
        List<UserLike> allLikes = userLikeRepository.findByPost(post);
        return allLikes.stream()
                .map(like -> {
                    User u = like.getUser();
                    return new UserDTO(u.getId(), u.getUsername(), u.getFirstName(), u.getLastName());
                })
                .collect(Collectors.toList());
    }


    public void likeComment(Long userId, Long commentId) {
        User user = userRepository.findById(userId).orElseThrow();
        Comment comment = commentRepository.findById(commentId).orElseThrow();

        if (userLikeRepository.existsByUserAndComment(user, comment)) return;

        UserLike like = new UserLike();
        like.setUser(user);
        like.setComment(comment);
        like.setType(UserLike.LikeType.COMMENT);
        userLikeRepository.save(like);
    }
}