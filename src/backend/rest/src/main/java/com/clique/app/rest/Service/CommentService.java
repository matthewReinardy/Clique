package com.clique.app.rest.Service;

import com.clique.app.rest.Models.Comment;
import com.clique.app.rest.Models.Post;
import com.clique.app.rest.Repo.CommentRepo;
import com.clique.app.rest.Repo.PostRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {


    private final CommentRepo commentRepository;
    private final PostRepo postRepository;

    public Comment addComment(Long postId, Long authorId, String content) {
        Post post = postRepository.findById(postId).orElseThrow();

        Comment comment = new Comment();
        comment.setPost(post);
        comment.setAuthorId(authorId);
        comment.setContent(content);
        return commentRepository.save(comment);
    }
}