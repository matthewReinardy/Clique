import java.awt.image.BufferedImage;

public class Ad {
    private int id;
    private boolean display;
    private BufferedImage image;
    private boolean isApproved;
    // this will be used to get the logged user ID
    // basically determining if the ad will be displayed (base user) versus not (business user)
    private User userID;

    public Ad(int id, boolean display, BufferedImage image, boolean isApproved, User userID) {
        this.id = id;
        this.display = display;
        this.image = image;
        this.isApproved = isApproved;
        this.userID = userID;
    }
    // getters and setters
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public boolean isDisplay() {
        return display;
    }
    public void setDisplay(boolean display) {
        this.display = display;
    }
    public BufferedImage getImage() {
        return image;
    }
    public void setImage(BufferedImage image) {
        this.image = image;
    }
    public boolean isApproved() {
        return isApproved;
    }
    public void setApproved(boolean approved) {
        isApproved = approved;
    }
    public User getUserID() {
        return userID;
    }
    public void setUserID(User userID) {
        this.userID = userID;
    }
}