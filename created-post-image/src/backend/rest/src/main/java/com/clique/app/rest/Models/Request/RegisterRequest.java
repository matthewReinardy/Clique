package com.clique.app.rest.Models.Request;

import lombok.Data;

// RegisterRequest.java
@Data
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;
}
