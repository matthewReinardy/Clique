package com.clique.app.rest.Models.Response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class CommentResponseDto {
    private String username;
    private String content;
    private LocalDateTime createdAt;
}