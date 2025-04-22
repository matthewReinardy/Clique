package com.clique.app.rest.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Column(nullable = false)
    private boolean display;

    @Column(nullable = false)
    private boolean isApproved;

    // store image as byte array for longblob column
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;

    // ensure each ad has a reference to the user
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;  // Linking Ad to a User

    public void setIsApproved(boolean isApproved) {
    }

    public boolean isApproved() {
        return isApproved;
    }

}
