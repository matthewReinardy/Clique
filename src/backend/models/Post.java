public class Post {
    // PK
    private Integer id;

    // FK (From User class)
    private User author;

    // Other
    private String content;
    private LocalDateTime createdAt;
    private String mediaURL;
    private List<Comment> comments;
    private List<Likes> likes;
    private Integer shareCount = 0;
    private Integer likeCount = 0;
    private Integer commentCount = 0;

    // Constructor
    public Post(Integer id, User author, String content, String mediaURL, LocalDateTime createdAt, List<Comment> comments,
                List<Likes> likes, Integer shareCount, Integer likeCount, Integer commentCount) {
        this.id = id;
        this.author = author;
        this.content = content;
        this.mediaURL = mediaURL;
        this.createdAt = createdAt;
        this.comments = comments;
        this.likes = likes;
        this.shareCount = shareCount;
        this.likeCount = likeCount;
        this.commentCount = commentCount;
    }

    // Getters
    public Integer getId() {
        return id;
    }

    public User getAuthor() {
        return author;
    }

    public String getContent() {
        return content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public String getMediaURL() {
        return mediaURL;
    }

    public List<Likes> getLikes() {
        return likes;
    }

    public Integer getLikeCount() {
        return likeCount;
    }

    public Integer getCommentCount() {
        return commentCount;
    }

    public Integer getShareCount() {
        return shareCount;
    }

    // Setters
    public void setId(Integer id) {
        this.id = id;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setMediaURL(String mediaURL) {
        this.mediaURL = mediaURL;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public void setLikes(List<Likes> likes) {
        this.likes = likes;
    }

    public void setShareCount(Integer shareCount) {
        this.shareCount = shareCount;
    }

    public void setCommentCount(Integer commentCount) {
        this.commentCount = commentCount;
    }

    public void setLikeCount(Integer likeCount) {
        this.likeCount = likeCount;
    }
}