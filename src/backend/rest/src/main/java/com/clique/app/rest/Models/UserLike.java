package com.clique.app.rest.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
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

    // ID for Like
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Foreign Key to User
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties("likes")
    private User user;

    // Foreign Key to Post, only used when LikeType is POST
    @ManyToOne
    @JoinColumn(name = "post_id")
    @JsonIgnoreProperties("likes")
    private Post post;

    // Foreign Key to Comment, only used when LikeType is COMMENT
    @ManyToOne
    @JoinColumn(name = "comment_id")
    @JsonIgnoreProperties("likes")
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