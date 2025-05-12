package com.clique.app.rest.Service;

import com.clique.app.rest.Models.Request.LoginRequest;
import com.clique.app.rest.Models.Request.RegisterRequest;
import com.clique.app.rest.Models.Response.LoginResponse;
import com.clique.app.rest.Models.User;
import com.clique.app.rest.Repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepo userRepository;

    public String register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already in use";
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            return "Username already taken";
        }

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .username(request.getUsername())
                .email(request.getEmail())
                .password(request.getPassword())
                .followerCount(0)
                .followingCount(0)
                .postCount(0)
                .build();

        userRepository.save(user);
        return "User registered successfully";
    }

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        LoginResponse authenticatedUser = new LoginResponse();
        authenticatedUser.setUserId(user.getId());
        authenticatedUser.setEmail(user.getEmail());
        authenticatedUser.setUserName(user.getFirstName());
        return authenticatedUser;
    }

}
