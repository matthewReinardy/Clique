package com.clique.app.rest.Models.Request;

import lombok.Data;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@Data
public class PostCreateRequest {
    private String content;
    private MultipartFile mediaFile;
    private String location;
    private List<String> tags;

}