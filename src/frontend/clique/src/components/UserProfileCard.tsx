import { useUserContext } from "../context/UserContext";
import { Card, CardContent, Typography, Button, Avatar } from "@mui/material"
import { loggedInUserId } from "../session/userRole";
import { UserId, User } from "../types/userTypes";
import { EditUserProfile } from "./forms/EditUserProfile"
import { useState } from "react";

export default function UserProfileCard() {

    const {users, loading, error} = useUserContext() 
    const userId = loggedInUserId as UserId
    
    //Find logged-in user
    const user: User | undefined = users.find((u) => u.id === userId)

    //Handle loading state:
    if (loading) {
        return <Typography>Loading...</Typography>
    }

    //Handle error state:
    if (error) {
        return <Typography>Error: {error}</Typography>
    }

    //If the user is not a user or business account
    if (!user || (user.accountType !== "business" && user.accountType !== "user")) {
        return <Typography>User profile not found.</Typography>
    }

    return (
        <Card sx={{ display: "flex", margin: "20px", maxWidth: 600 }}>
            <Avatar
                src={user.profilePicture || undefined}
                sx={{ width: 150, height: 150, fontSize: 40 }}
            >
                {user.username[0].toUpperCase()}
            </Avatar>

            <CardContent sx={{ flex: 1 }}>
            <Typography variant="h6" component="h2">
                {user.username}
            </Typography>

            <Typography variant="body2" color="text.secondary">
                {user.bio || "This user has no bio."}
            </Typography>

            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-around" }}>
                <div>
                <Typography variant="body2" color="text.secondary">
                    Posts
                </Typography>
                <Typography variant="h6">{user.postCount}</Typography>
                </div>
                <div>
                <Typography variant="body2" color="text.secondary">
                    Followers
                </Typography>
                <Typography variant="h6">{user.followerCount}</Typography>
                </div>
                <div>
                <Typography variant="body2" color="text.secondary">
                    Following
                </Typography>
                <Typography variant="h6">{user.followingCount}</Typography>
                </div>
            </div>

            <Button 
                variant="contained" 
                sx={{ marginTop: "20px", width: "100%" }} 
                onClick={() => alert("Edit Profile functionality coming soon!")}>
                Edit Profile
            </Button>
            </CardContent>
        </Card>
    )
}