package com.clique.app.rest.Models.Response;


import com.clique.app.rest.Models.Comment;
import com.clique.app.rest.Models.User;
import com.clique.app.rest.Models.UserLike;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@JsonNaming(PropertyNamingStrategies.LowerCamelCaseStrategy.class)
public class PostDto {
    private Long id;
    private User author;
    private String content;
    private String mediaFileName;
    private byte[] mediaFileData;
    private String  createdAt;
    private String location;
    private List<String> tags;
    private List<Comment> comments;
    private String commentUserName;
    private List<UserLike> likes;
    private Integer shareCount;
    private Integer commentCount;
    private Integer likeCount;
}
