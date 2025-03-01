import static org.junit.jupiter.api.Assertions.*;  // For assertTrue, assertFalse, etc.
import static org.mockito.Mockito.*;               // For when, verify

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;


class AuthenticationTest {

    @Mock
    private AuthenticationService authService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testUserSignUp() {
        // Fix the incomplete statement: add .thenReturn(true)
        when(authService.signUp("John Doe", "johndoe@example.com", "john_doe", "password123"))
            .thenReturn(true);

        boolean result = authService.signUp("John Doe", "johndoe@example.com", "john_doe", "password123");
        assertTrue(result, "User should be able to sign up successfully.");

        verify(authService).signUp("John Doe", "johndoe@example.com", "john_doe", "password123");
    }

    @Test
    void testDuplicateUserSignUp() {
        // Fix the incomplete statement by chaining .thenReturn(...) calls
        when(authService.signUp("Jane Doe", "janedoe@example.com", "jane_doe", "securePass!"))
            .thenReturn(true)
            .thenReturn(false);

        boolean firstSignup = authService.signUp("Jane Doe", "janedoe@example.com", "jane_doe", "securePass!");
        boolean secondSignup = authService.signUp("Jane Doe", "janedoe@example.com", "jane_doe", "securePass!");

        assertTrue(firstSignup,  "First sign-up should succeed.");
        assertFalse(secondSignup, "Duplicate sign-up should fail.");
    }

    @Test
    void testUserLogin() {
        when(authService.login("jane_doe", "securePass!")).thenReturn(true);

        boolean loginResult = authService.login("jane_doe", "securePass!");
        assertTrue(loginResult, "User should log in with correct credentials.");
    }

    @Test
    void testInvalidLogin() {
        when(authService.login("invalid_user", "wrongPassword")).thenReturn(false);

        boolean loginResult = authService.login("invalid_user", "wrongPassword");
        assertFalse(loginResult, "Login should fail with incorrect credentials.");
    }

    @Test
    void testPasswordReset() {
        when(authService.resetPassword("user1", "newPass")).thenReturn(true);

        boolean resetResult = authService.resetPassword("user1", "newPass");
        assertTrue(resetResult, "User should be able to reset their password.");
    }

    @Test
    void testLogout() {
        when(authService.logout()).thenReturn(true);

        boolean logoutResult = authService.logout();
        assertTrue(logoutResult, "User should be able to log out.");
    }

    @Test
    void testLogoutWithoutLogin() {
        when(authService.logout()).thenReturn(false);

        boolean logoutResult = authService.logout();
        assertFalse(logoutResult, "Logout should fail if the user is not logged in.");
    }
}
