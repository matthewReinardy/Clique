package com.clique.app.rest.Models.Request;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}