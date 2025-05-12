package com.clique.app.rest.Models;

import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
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
@JsonNaming(PropertyNamingStrategies.LowerCamelCaseStrategy.class)
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Ensures each post is linked to a user
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "author_id")
//    @JsonBackReference
    private User author;
    @Column(nullable = false, length = 500)
    private String content;
    @Column(nullable = true)
    private String mediaFileName;
    @Lob
    @Column(name = "media_file_data", columnDefinition = "LONGBLOB")
    private byte[] mediaFileData;
    // Time post was created at
    @Column(name = "created_at",nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @Column(name = "location")
    private String location;
    @Column(name = "tags")
    private  List<String> tags;
    // One Post can have many Comments
    @JsonIgnore
    @OneToMany(mappedBy = "post")
//    @JsonManagedReference
    private List<Comment> comments;
    // One Post can have many likes
    @JsonIgnore
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
//    @JsonIgnoreProperties("post")
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