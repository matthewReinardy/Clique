package com.clique.app.rest.Controller.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PostDTO {
    private Long id;
    private String caption;
    private String location;
    private String tag;
    private String createdAt;
    private String authorUsername;
    private int likeCount;
    private int commentCount;
    private byte[] image;
}
