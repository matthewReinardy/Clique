package com.clique.app.rest.testController;

import com.clique.app.rest.Controller.AuthenticationController;
import com.clique.app.rest.Repository.UserRepository;
import com.clique.app.rest.Service.UserService;
import com.clique.app.rest.Models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(AuthenticationController.class)
@AutoConfigureMockMvc
public class AuthenticationControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private UserRepository userRepository;
    @MockBean
    private UserService userService;
    @Autowired
    private AuthenticationController authenticationController;

    @BeforeEach
    public void setup() {
        PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword(passwordEncoder.encode("password"));
        userRepository.save(user);
    }

    @Test
    public void testLogin_Success() throws Exception {
        User user = new User();
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setEmail("test@example.com");
        user.setPassword(passwordEncoder.encode("password"));

        when(userService.findByEmail("test@example.com")).thenReturn(user);

        mockMvc.perform(post("/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\": \"test@example.com\", \"password\": \"password\"}")
                        .with(csrf())) // Add CSRF token
                .andExpect(status().is3xxRedirection());
    }

    @Test
    public void testLogin_Failure() throws Exception {
        mockMvc.perform(post("/login")
                        .param("username", "wrong@example.com")
                        .param("password", "wrongpassword")
                        .with(csrf()))
                .andExpect(status().is3xxRedirection()) // 302 Redirect on failure
                .andExpect(redirectedUrl("/login?error"));
    }
    @Test
    public void testRegisterUser_EmailAlreadyExists() throws Exception {
        User existingUser = new User();
        existingUser.setEmail("test@example.com");

        when(userService.findByEmail("test@example.com")).thenReturn(existingUser);

        mockMvc.perform(post("/register")
                        .param("email", "test@example.com")
                        .param("password", "password")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(view().name("register"))
                .andExpect(model().attributeExists("user"))
                .andExpect(model().attributeHasFieldErrors("user", "email"));
    }

    @Test
    public void testLogout() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/logout"))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("http://localhost/login"));
    }

}
