package com.clique.app.rest.Controller;

import com.clique.app.rest.Models.User;
import com.clique.app.rest.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
public class AuthenticationController {
@Autowired
private UserService userService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
public String registerUser(@ModelAttribute("user") User user, BindingResult result, Model model) {
    PasswordEncoder passwordEncoder= new BCryptPasswordEncoder();
    User existingUser = userService.findByEmail(user.getEmail());

    if (existingUser != null) {
        result.rejectValue("email", "error.user", "An account with this email already exists.");
    }

    if (result.hasErrors()) {
        return "register";
    }
    User registerUser =new User();
    registerUser.setFirstName(user.getFirstName());
    registerUser.setLastName(user.getLastName());
    registerUser.setUsername(user.getUsername());
    registerUser.setEmail(user.getEmail());
    registerUser.setPassword(passwordEncoder.encode(user.getPassword()));
    registerUser.setPhoneNumber(user.getPhoneNumber());
    registerUser.setDateOfBirth(user.getDateOfBirth());
    userService.saveUser(registerUser);
    return "redirect:/login";
}
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return ResponseEntity.ok("Login successful!");
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid credentials!");
        }
    }

    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "Logged out successfully!";
    }
    @GetMapping("/logout")
    public String logout(HttpSession session, HttpServletResponse response) {
        session.invalidate();
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Expires", "0");
        return "redirect:/login";
    }

}
