package com.clique.app.rest.Models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HelpCenterClaim {

    // Types of issues users can report
    public enum IssueType {
        BUG,
        CONTENT_MODERATION,
        TECHNICAL_SUPPORT
    };

    // State of claim, admin will handle this
    public enum Status {
        OPEN,
        IN_PROGRESS,
        CLOSED,
    }

    // PK
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // FK (From User class)
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Claim details
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private IssueType issueType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}