import java.util.HashMap;
import java.util.Map;

public class UserProfileService {

    private Map<String, UserProfile> profiles = new HashMap<>();

    public UserProfileService() {
        // Create a sample profile for "john_doe"
        profiles.put("john_doe", new UserProfile(
            "John Doe",
            "john_doe",
            "Hello, world!",
            "profile.jpg"
        ));
    }

    /**
     * Edits the bio and profile picture for the given user.
     * 
     * @param username        The username of the profile to edit
     * @param newBio          The new bio text
     * @param newProfilePic   The new profile picture
     * @return true if the profile was edited successfully; false if user not found
     */
    public boolean editProfile(String username, String newBio, String newProfilePic) {
        if (profiles.containsKey(username)) {
            UserProfile profile = profiles.get(username);
            profile.setBio(newBio);
            profile.setProfilePicture(newProfilePic);
            return true;
        }
        return false;
    }

    /**
     * Deletes the profile for the given user.
     * 
     * @param username  The username of the profile to delete
     * @return true if the profile was deleted; false if user not found
     */
    public boolean deleteProfile(String username) {
        return profiles.remove(username) != null;
    }

    // Inner class to represent a user profile
    static class UserProfile {
        private String name;
        private String username;
        private String bio;
        private String profilePicture;

        public UserProfile(String name, String username, String bio, String profilePicture) {
            this.name = name;
            this.username = username;
            this.bio = bio;
            this.profilePicture = profilePicture;
        }

        public void setBio(String bio) {
            this.bio = bio;
        }

        public void setProfilePicture(String profilePicture) {
            this.profilePicture = profilePicture;
        }
    }
}
