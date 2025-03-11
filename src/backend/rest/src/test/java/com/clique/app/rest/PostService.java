import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class PostService {
    // Simple post ID auto-increment
    private int postIdCounter = 0;

    // postId -> Post object
    private Map<Integer, Post> posts = new HashMap<>();

    /**
     * Create a post with the given username, content, and optional image path.
     * @param username   The user creating the post
     * @param content    The text content of the post
     * @param imagePath  An optional image path
     * @return true if the post is created successfully
     */
    public boolean createPost(String username, String content, String imagePath) {
        postIdCounter++;
        Post newPost = new Post(postIdCounter, username, content, imagePath);
        posts.put(postIdCounter, newPost);
        return true;
    }

    /**
     * Like a post, given a post ID and a username who is liking the post.
     * @param postId   The ID of the post to like
     * @param username The user who likes the post
     * @return true if like is successful; false otherwise
     */
    public boolean likePost(int postId, String username) {
        Post post = posts.get(postId);
        if (post == null) {
            return false;
        }
        post.like(username);
        return true;
    }

    /**
     * Comment on a post.
     * @param postId   The ID of the post
     * @param username The user who is commenting
     * @param comment  The text of the comment
     * @return true if comment is successful; otherwise false
     */
    public boolean commentOnPost(int postId, String username, String comment) {
        Post post = posts.get(postId);
        if (post == null) {
            return false;
        }
        post.comment(username, comment);
        return true;
    }

    /**
     * Delete a post, only if the requesting user is the owner of the post.
     * @param postId   The ID of the post
     * @param username The user requesting deletion
     * @return true if the post was successfully deleted; otherwise false
     */
    public boolean deletePost(int postId, String username) {
        Post post = posts.get(postId);
        if (post == null) {
            return false;
        }
        // Only owner can delete
        if (!post.owner.equals(username)) {
            return false;
        }
        posts.remove(postId);
        return true;
    }

    /**
     * Internal class to hold post details.
     */
    private static class Post {
        int id;
        String owner;
        String content;
        String imagePath;
        Set<String> likes;
        Set<String> comments;

        Post(int id, String owner, String content, String imagePath) {
            this.id = id;
            this.owner = owner;
            this.content = content;
            this.imagePath = imagePath;
            this.likes = new HashSet<>();
            this.comments = new HashSet<>();
        }

        void like(String username) {
            likes.add(username);
        }

        void comment(String username, String text) {
            comments.add(username + ": " + text);
        }
    }
}
