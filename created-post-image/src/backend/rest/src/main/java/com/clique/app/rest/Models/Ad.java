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

    @Column(nullable = false)
    private boolean display;

    @Column(nullable = false)
    private boolean isApproved;

    // Store image URL as String (mediaUrl)
    @Column(nullable = false)
    private String mediaUrl;
}