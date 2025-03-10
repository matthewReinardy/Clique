package com.clique.app.rest.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
public class Comment {

    // Comment ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Foreign Key to User
    @Column(name = "author_id", nullable = false)
    private Long authorId;

    @Column(nullable = false, length = 500)
    private String content;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Foreign Key to Post (each comment is associated with a post)
    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    @JsonIgnoreProperties("comments")
    private Post post;

    // One Comment can have many Likes
    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("comment")
    private List<UserLike> likes;

    public int getLikeCount() {
        if (likes == null) {
            return 0;
        }
        return likes.size();
    }

    // Automatically set createdAt when a new comment is created
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}