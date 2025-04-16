package com.clique.app.rest.Models;

import javax.persistence.*;
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
    private int id;

    @Column(nullable = false)
    private boolean display;

    @Column(nullable = false)
    private boolean isApproved;

    // Foreign key reference to User
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Store image URL instead of BufferedImage
    @Column(nullable = false)
    private String mediaUrl;
}