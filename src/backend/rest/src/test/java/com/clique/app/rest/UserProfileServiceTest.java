import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class UserProfileServiceTest {

    private UserProfileService userProfileService;

    @BeforeEach
    void setUp() {
        // This calls the constructor, which adds the sample user "john_doe"
        userProfileService = new UserProfileService();
    }

    @Test
    void testEditProfileSuccess() {
        // "john_doe" exists in the default constructor
        boolean result = userProfileService.editProfile("john_doe", "New bio", "new_pic.jpg");
        assertTrue(result, "Editing existing user profile should succeed");
    }

    @Test
    void testEditProfileFailure() {
        // This user does NOT exist
        boolean result = userProfileService.editProfile("unknown_user", "Any bio", "any_pic.jpg");
        assertFalse(result, "Editing non-existent user profile should fail");
    }

    @Test
    void testDeleteProfileSuccess() {
        // "john_doe" was added in the constructor
        boolean result = userProfileService.deleteProfile("john_doe");
        assertTrue(result, "Deleting existing user profile should succeed");

        // A second delete call should now fail, because the user was removed
        boolean secondDelete = userProfileService.deleteProfile("john_doe");
        assertFalse(secondDelete, "Deleting the same user again should fail");
    }

    @Test
    void testDeleteProfileFailure() {
        boolean result = userProfileService.deleteProfile("non_existent");
        assertFalse(result, "Deleting a non-existent user profile should fail");
    }
}
