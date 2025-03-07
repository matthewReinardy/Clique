package com.clique.app.rest.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Post {

    // id for Post
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Ensures each post is linked to a user
    @ManyToOne
    @JoinColumn(name = "author_id")
    @JsonIgnoreProperties("posts")
    private User author;

    // Caption of a post, setting a limit
    @Column(nullable = false, length = 500)
    private String content;

    // Link to users local image
    @Column(nullable = true)
    private String mediaURL;

    // Time post was created at
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // One Post can have many Comments
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("post")
    private List<Comment> comments;

    // One Post can have many likes
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("post")
    private List<UserLike> likes;

    @Column(nullable = false)
    private Integer shareCount = 0;

    // Dynamically calculates and returns the like count for this specific Post
    public int getLikeCount() {
        if (likes == null) {
            return 0;
        }
        return likes.size();
    }

    // Dynamically calculates and returns the comment count for this specific Post
    public int getCommentCount() {
        if (comments == null) {
            return 0;
        }
        return comments.size();
    }

    // Sets the creation time for the post
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}