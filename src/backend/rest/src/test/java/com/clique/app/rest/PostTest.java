
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
class PostTest {
 private PostService postService;
 @BeforeEach
 void setUp() {
 postService = new PostService(); // Mocked service
 }
 @Test
 void testCreatePost() {
 boolean result = postService.createPost("john_doe", "Hello World!", "image.jpg");
 assertTrue(result, "User should be able to create a post.");
 }
 @Test
 void testLikePost() {
 postService.createPost("john_doe", "Hello World!", "image.jpg");
 boolean likeResult = postService.likePost(1, "jane_doe");
 assertTrue(likeResult, "User should be able to like a post.");
 }
 @Test
 void testCommentOnPost() {
 postService.createPost("john_doe", "Hello World!", "image.jpg");
 boolean commentResult = postService.commentOnPost(1, "jane_doe", "Nice post!");
 assertTrue(commentResult, "User should be able to comment on a post.");
 }
 @Test
 void testDeletePost() {
 postService.createPost("john_doe", "Hello World!", "image.jpg");
 boolean deleteResult = postService.deletePost(1, "john_doe");
 assertTrue(deleteResult, "User should be able to delete their own post.");
 }
}