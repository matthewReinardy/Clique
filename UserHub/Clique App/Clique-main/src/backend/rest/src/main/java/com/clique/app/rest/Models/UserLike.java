package com.clique.app.rest.Models;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID for UserLike

    // Foreign Key to User
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Foreign Key to Post, only used when LikeType is POST
    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    // Foreign Key to Comment, only used when LikeType is COMMENT
    @ManyToOne
    @JoinColumn(name = "comment_id")
    private Comment comment;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LikeType type;

    public enum LikeType {
        POST,
        COMMENT
    }

    // Automatically set createdAt when a new like is created
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}