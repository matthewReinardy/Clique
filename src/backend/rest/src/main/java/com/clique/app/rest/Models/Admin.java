package com.clique.app.rest.Models;

public class Admin {
    // variables to be used for each admin
    private int id;
    private String username;
    private String email;
    private String password;
    private String accountType;

    public Admin(int id, String username, String email, String password, String accountType) {
        this.id = id;
        this.username = "Administrator";
        this.email = email;
        this.password = password;
        this.accountType = accountType;
    }

    // getters and setters

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getAccountType() {
        return accountType;
    }
    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }
}