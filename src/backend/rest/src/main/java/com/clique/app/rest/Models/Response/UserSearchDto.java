package com.clique.app.rest.Models.Response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserSearchDto {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String profilePicture;
    private boolean isFollowing; // ✅ Follow status

}