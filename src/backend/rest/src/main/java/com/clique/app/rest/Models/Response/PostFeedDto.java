package com.clique.app.rest.Models.Response;

import com.clique.app.rest.Models.Comment;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class PostFeedDto {
    private Long postId;
    private String content;
    private String mediaFileName;
    private byte[] mediaFileData;
    private LocalDateTime createdAt;
    private Integer commentCount;
    private Integer likeCount;


    // Author info
    private Long authorId;
    private String authorUsername;
    private String authorFirstName;
    private String authorLastName;
    private String authorProfilePicture;
}
