public class Comment {

    // PK
    private Integer id;

    // FK (From User Class)
    private User author;

    // Other
    private String content;
    private LocalDateTime createdAt;
    private Post post;
    private List<Like> likes;
    private Integer likeCount = 0;

    // Constructor
    public Comment(Integer id, User author, String content, LocalDateTime createdAt, Post post, List<Like> likes, Integer likeCount) {
        this.id = id;
        this.author = author;
        this.content = content;
        this.createdAt = createdAt;
        this.post = post;
        this.likes = likes;
        this.likeCount = likeCount;
    }

    //Getters

    public Integer getId() {
        return id;
    }

    public Integer getLikeCount() {
        return likeCount;
    }

    public List<Like> getLikes() {
        return likes;
    }

    public Post getPost() {
        return post;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public String getContent() {
        return content;
    }

    public User getAuthor() {
        return author;
    }

    //Setters
    public void setId(Integer id) {
        this.id = id;
    }

    public void setLikeCount(Integer likeCount) {
        this.likeCount = likeCount;
    }

    public void setLikes(List<Like> likes) {
        this.likes = likes;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setAuthor(User author) {
        this.author = author;
    }
}