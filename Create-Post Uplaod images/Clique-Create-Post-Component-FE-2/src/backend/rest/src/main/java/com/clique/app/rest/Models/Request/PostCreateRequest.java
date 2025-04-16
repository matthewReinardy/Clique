package com.clique.app.rest.Models.Request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;


@Data
public class PostCreateRequest {
    private Long authorId;
    private String content;
    private MultipartFile mediaFile;
}