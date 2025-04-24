package com.clique.app.rest;
import com.clique.app.rest.Controller.UserController;
import com.clique.app.rest.Models.User;
import com.clique.app.rest.Repo.UserRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.*;
import org.springframework.http.MediaType;

import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserRepo userRepo;

    @Autowired
    private ObjectMapper objectMapper;

    private User sampleUser;

    @BeforeEach
    void setUp() {
        sampleUser = new User();
        sampleUser.setId(1L);
        sampleUser.setFirstName("John");
        sampleUser.setLastName("Doe");
        sampleUser.setPhoneNumber("1234567890");
        sampleUser.setEmail("john@example.com");
        sampleUser.setUsername("johndoe");
        sampleUser.setBio("Just a bio");
    }

    @Test
    void testGetAllUsers() throws Exception {
        when(userRepo.findAll()).thenReturn(Arrays.asList(sampleUser));

        mockMvc.perform(get("/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].firstName").value("John"));
    }

    @Test
    void testGetUserById_Found() throws Exception {
        when(userRepo.findById(1L)).thenReturn(Optional.of(sampleUser));

        mockMvc.perform(get("/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("John"));
    }

    @Test
    void testGetUserById_NotFound() throws Exception {
        when(userRepo.findById(2L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/users/2"))
                .andExpect(status().isOk())
                .andExpect(content().string("null")); // Expecting actual serialized null
    }

    @Test
    void testSaveUser() throws Exception {
        when(userRepo.save(any(User.class))).thenReturn(sampleUser);

        mockMvc.perform(post("/users/save")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(sampleUser)))
                .andExpect(status().isOk())
                .andExpect(content().string("Saved..."));
    }

    @Test
    void testUpdateUser_Success() throws Exception {
        when(userRepo.findById(1L)).thenReturn(Optional.of(sampleUser));
        when(userRepo.save(any(User.class))).thenReturn(sampleUser);

        sampleUser.setFirstName("Updated");

        mockMvc.perform(put("/users/update/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(sampleUser)))
                .andExpect(status().isOk())
                .andExpect(content().string("User updated successfully!"));
    }

    @Test
    void testUpdateUser_NotFound() throws Exception {
        when(userRepo.findById(1L)).thenReturn(Optional.empty());

        mockMvc.perform(put("/users/update/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(sampleUser)))
                .andExpect(status().isNotFound())
                .andExpect(content().string("User not found"));
    }

    @Test
    void testUpdateUser_InvalidIdFormat() throws Exception {
        mockMvc.perform(put("/users/update/abc")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(sampleUser)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Invalid user ID format"));
    }

    @Test
    void testDeleteUser_Success() throws Exception {
        when(userRepo.findById(1L)).thenReturn(Optional.of(sampleUser));
        doNothing().when(userRepo).delete(any(User.class));

        mockMvc.perform(delete("/users/delete/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("User deleted successfully!"));
    }

    @Test
    void testDeleteUser_NotFound() throws Exception {
        when(userRepo.findById(1L)).thenReturn(Optional.empty());

        mockMvc.perform(delete("/users/delete/1"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("User not found"));
    }
}
