package com.clique.app.rest.Models.Response;

import lombok.Data;

@Data
public class LoginResponse {
    private long userId;
    private String email;
    private String userName;

}
