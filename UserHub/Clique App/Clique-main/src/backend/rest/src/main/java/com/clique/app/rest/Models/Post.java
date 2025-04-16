package com.clique.app.rest.Models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Changed to match User ID type

    // Ensures each post is linked to a user
    @ManyToOne
    @JoinColumn(name = "author_id")
    @JsonIgnoreProperties("posts")
    private User author;

    @Column(nullable = false, length = 500)
    private String content;

    @Column(nullable = true)
    private String mediaURL;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // One Post can have many Comments
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("post")
    private List<Comment> comments;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("post")
    private List<UserLike> likes;

    @Column(nullable = false)
    private Integer shareCount = 0;

    /*
    Auto-calculate like & comment count instead of storing static values
     */
    public int getLikeCount() {
        if (likes == null) {
            return 0;
        }
        return likes.size();
    }

    public int getCommentCount() {
        if (comments == null) {
            return 0;
        }
        return comments.size();
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}