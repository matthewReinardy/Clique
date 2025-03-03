package com.clique.app.rest.Models;

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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Comment ID

    // Foreign Key to User
    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false) // Foreign key to User (author of the comment)
    private User author;

    @Column(nullable = false, length = 500)
    private String content; // Comment content

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Foreign Key to Post (each comment is associated with a post)
    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    // One Comment can have many Likes
    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL, orphanRemoval = true)
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