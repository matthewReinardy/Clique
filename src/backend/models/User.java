public class User {

    // Basic personal information
    private Integer id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private String bio;
    private String location;

    // Account credentials
    private String username;
    private String email;
    private String password;

    // Profile information
    private Boolean isPrivate;
    private Boolean isVerified;
    private String profilePicture;
    private String accountType;

    // Social data (following, follwers, etc)
    private List<String> interests;
    private Integer followerCount = 0;
    private Integer followingCount = 0;
    private Integer postCount = 0;
    private List<Post> posts;
    private List<User> followers;
    private List<User> following;

    // Account status
    private boolean isActive = true;
    private boolean isSuspended = false;

    // Mega Constructor
    public User(boolean isActive, boolean isSuspended, List<User> following, List<User> followers, List<Post> posts,
                Integer postCount, Integer followingCount, List<String> interests, Integer followerCount, String accountType,
                Boolean isVerified, String profilePicture, Boolean isPrivate, String password, String email, String username,
                String location, String bio, LocalDate dateOfBirth, String phoneNumber, String lastName, String firstName, Integer id) {
        this.isActive = isActive;
        this.isSuspended = isSuspended;
        this.following = following;
        this.followers = followers;
        this.posts = posts;
        this.postCount = postCount;
        this.followingCount = followingCount;
        this.interests = interests;
        this.followerCount = followerCount;
        this.accountType = accountType;
        this.isVerified = isVerified;
        this.profilePicture = profilePicture;
        this.isPrivate = isPrivate;
        this.password = password;
        this.email = email;
        this.username = username;
        this.location = location;
        this.bio = bio;
        this.dateOfBirth = dateOfBirth;
        this.phoneNumber = phoneNumber;
        this.lastName = lastName;
        this.firstName = firstName;
        this.id = id;
    }

    // Getters
    public Integer getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public String getBio() {
        return bio;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    public String getLocation() {
        return location;
    }

    public String getPassword() {
        return password;
    }

    public Boolean getIsPrivate() {
        return isPrivate;
    }

    public Boolean getIsVerified() {
        return isVerified;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public String getAccountType() {
        return accountType;
    }

    public List<String> getInterests() {
        return interests;
    }

    public Integer getFollowerCount() {
        return followerCount;
    }

    public Integer getFollowingCount() {
        return followingCount;
    }

    public Integer getPostCount() {
        return postCount;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public List<User> getFollowers() {
        return followers;
    }

    public boolean isActive() {
        return isActive;
    }

    public boolean isSuspended() {
        return isSuspended;
    }

    public List<User> getFollowing() {
        return following;
    }

    // Setters
    public void setId(Integer id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setIsPrivate(Boolean isPrivate) {
        this.isPrivate = isPrivate;
    }

    public void setIsVerified(Boolean isVerified) {
        this.isVerified = isVerified;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public void setInterests(List<String> interests) {
        this.interests = interests;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public void setFollowerCount(Integer followerCount) {
        this.followerCount = followerCount;
    }

    public void setFollowingCount(Integer followingCount) {
        this.followingCount = followingCount;
    }

    public void setSuspended(boolean suspended) {
        isSuspended = suspended;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public void setFollowing(List<User> following) {
        this.following = following;
    }

    public void setFollowers(List<User> followers) {
        this.followers = followers;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    public void setPostCount(Integer postCount) {
        this.postCount = postCount;
    }
}