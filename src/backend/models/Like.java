public class Like {

    //PK
    private Integer id;

    //FK (From User class)
    private User user;

    // FK (From Post and Comment class, you can like both)
    private Integer postId;
    private Integer commentId;

    //Other
    private LocalDateTime createdAt;

    // (Either a post, comment)
    private LikeType type;

    // enum for the type of item they are liking
    public enum LikeType {
        POST,
        COMMENT
    }

    // Constructor
    public Like(Integer id, User user, Integer postId, Integer commentId, LocalDateTime createdAt, LikeType type) {
        this.id = id;
        this.user = user;
        this.postId = postId;
        this.commentId = commentId;
        this.createdAt = createdAt;
        this.type = type;
    }

    //Getters
    public Integer getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Integer getPostId() {
        return postId;
    }

    public Integer getCommentId() {
        return commentId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LikeType getType() {
        return type;
    }

    //Setters
    public void setId(Integer id) {
        this.id = id;
    }

    public void setType(LikeType type) {
        this.type = type;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setCommentId(Integer commentId) {
        this.commentId = commentId;
    }

    public void setPostId(Integer postId) {
        this.postId = postId;
    }

    public void setUser(User user) {
        this.user = user;
    }
}