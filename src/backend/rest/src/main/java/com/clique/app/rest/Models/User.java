package com.clique.app.rest.Models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
    private String email;

    @Column(nullable = false)
    private String password;

    @Column
    private String phoneNumber;

    // PFP,
    @Column
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

    // One-to-Many relationship, User can have many HelpCenterClaims
    @OneToMany(mappedBy = "user")
    @JsonIgnoreProperties("user")
    private List<HelpCenterClaim> claims;

    // Many-to-Many relationship for followers
    @ManyToMany
    @JoinTable(
            name = "user_followers",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "follower_id")
    )
    @JsonIgnoreProperties({"followers", "following"})
    private Set<User> followers;

    // Many-to-Many relationship for following
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
