package com.clique.app.rest.Models.Request;

import lombok.Data;

@Data
public class LoginRequest {
    private Long autherId;
    private String email;
    private String password;
}