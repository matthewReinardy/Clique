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

    @Column
    private String caption;

    @Column(nullable = true)
    private String tag;

    // Location of the post
    @Column
    private String location;

    // Tags for the post
    @Column
    private String tags;


    // The LONGBLOB can hold 4,294,967,295 bytes of data (4GB) so that will be the max image size for the posts
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;

    // Time post was created at
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // One Post can have many Comments
    @OneToMany(mappedBy = "post")
    @JsonIgnoreProperties({"post", "author"})
    private List<Comment> comments;

    // One Post can have many likes
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("post")
    private List<UserLike> likes;

    @Column
    private Integer shareCount = 0;

    @Column(nullable = false)
    private boolean isAd;

    public boolean isAd() {
        return isAd;
    }

    public void setAd(boolean isAd) {
        this.isAd = isAd;
    }

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