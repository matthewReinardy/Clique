package com.clique.app.rest.Models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @Column(nullable = false)
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;

    @Column
    @Pattern(regexp = "^\\+?[0-9]*$", message = "Invalid phone number")
    private String phoneNumber;

    @Column
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;

    @Column
    private String bio;

    @Column
    private String location;

    @Column
    private Boolean isPrivate;

    @Column
    private Boolean isVerified;

    @Column
    private String profilePicture;

    @Column
    private String accountType;

    @ElementCollection
    private List<String> interests;

    @Column(nullable = false)
    private Integer followerCount = 0;

    @Column(nullable = false)
    private Integer followingCount = 0;

    @Column(nullable = false)
    private Integer postCount = 0;

    // One user can have many posts
    @OneToMany(mappedBy = "author")
    @JsonIgnoreProperties("author")
    private List<Post> posts;

    // One user can have many comments

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("author")
    private Set<Comment> comments;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("user")
    private Set<UserLike> likes;

    // Many-to-Many relationship for followers and following
    @ManyToMany
    @JoinTable(
            name = "user_followers",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "follower_id")
    )
    @JsonIgnoreProperties({"followers", "following"})
    private Set<User> followers;

    @ManyToMany
    @JoinTable(
            name = "user_following",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "following_id")
    )
    @JsonIgnoreProperties({"followers", "following"})
    private Set<User> following;

    @Column(nullable = false)
    private boolean isActive = true;

    @Column(nullable = false)
    private boolean isSuspended = false;
}
