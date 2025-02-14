public class HelpCenterClaim {

    // Types of issues users can report
    public enum IssueType {
        BUG,
        CONTENT_MODERATION,
        TECHNICAL_SUPPORT
    };

    // State of claim, admin will handle this
    public enum Status {
        OPEN,
        IN_PROGRESS,
        CLOSED,
    }
    // PK
    private Integer id;

    // FK (From User class)
    private User user;

    //Claim details
    private String description;
    private IssueType issueType;
    private Status status;
    private LocalDateTime createdAt;

    // Construct
    public HelpCenterClaim(Integer id, User user, String description, IssueType issueType, Status status, LocalDateTime createdAt) {
        this.id = id;
        this.user = user;
        this.description = description;
        this.issueType = issueType;
        this.status = status;
        this.createdAt = createdAt;
    }

    //Getters
    public Integer getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getDescription() {
        return description;
    }

    public IssueType getIssueType() {
        return issueType;
    }

    public Status getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

     // Setters
    public void setId(Integer id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setIssueType(IssueType issueType) {
        this.issueType = issueType;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}