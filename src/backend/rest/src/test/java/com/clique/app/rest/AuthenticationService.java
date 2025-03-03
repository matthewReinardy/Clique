import java.util.HashSet;
import java.util.Set;

public class AuthenticationService {

    private final Set<String> registeredUsers = new HashSet<>();
    private boolean userLoggedIn = false;

    /**
     * Attempts to sign up a new user.
     * @param fullName  The user's full name
     * @param email     The user's email
     * @param username  The desired username
     * @param password  The desired password
     * @return true if the signup succeeds (user not already registered),
     *         false otherwise
     */
    public boolean signUp(String fullName, String email, String username, String password) {
        if (registeredUsers.contains(username)) {
            // This simulates a duplicate user scenario.
            return false;
        }
        registeredUsers.add(username);
        return true;
    }

    /**
     * Logs in a user if they are in the registered set.
     * @param username The user's username
     * @param password The user's password
     * @return true if login is successful, false otherwise
     */
    public boolean login(String username, String password) {
        if (registeredUsers.contains(username)) {
            userLoggedIn = true;
            return true;
        }
        return false;
    }

    /**
     * Resets the password if the user exists.
     * (We do not track passwords here; just return true if the user is known.)
     * @param username  The user's username
     * @param newPass   The new password
     * @return true if reset succeeds, false otherwise
     */
    public boolean resetPassword(String username, String newPass) {
        return registeredUsers.contains(username);
    }

    /**
     * Logs out the current user if someone is logged in.
     * @return true if a user was logged in and is now logged out,
     *         false if no user was logged in
     */
    public boolean logout() {
        if (userLoggedIn) {
            userLoggedIn = false;
            return true;
        }
        return false;
    }
}
