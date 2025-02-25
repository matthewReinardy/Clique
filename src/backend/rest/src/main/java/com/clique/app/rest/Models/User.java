package com.clique.app.rest.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column
    private String phoneNumber;

    @Column
    private LocalDate dateOfBirth;

    @Column
    private String bio;

    @Column
    private String location;

    // Account credentials
    @Column
    private String username;
    @Column
    private String email;
    @Column
    private String password;

    // Profile information
    @Column
    private Boolean isPrivate;
    @Column
    private Boolean isVerified;
    @Column
    private String profilePicture;
    @Column
    private String accountType;

    // Social data (following, follwers, etc)
    @Column
    private List<String> interests;
    @Column
    private Integer followerCount = 0;
    @Column
    private Integer followingCount = 0;
    @Column
    private Integer postCount = 0;

    /*private List<Post> posts;
    @Column
    private List<User> followers;
    @Column
    private List<User> following;*/

    // Account status
    @Column
    private boolean isActive = true;
    @Column
    private boolean isSuspended = false;

    public void setIsActive(boolean active) {
    }

    public void setIsSuspended(boolean suspended) {
    }
}
