import { useUserContext } from "../context/UserContext";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material"

export default function UserProfileCard() {

    const {users, loading, error} = useUserContext() //Access user data from context

    //Handle loading state:
    if (loading) {
        return <Typography>Loading...</Typography>
    }

    //Handle error state:
    if (error) {
        return <Typography>Error: {error}</Typography>
    }

    return (
        <div>
            {users.map((user) => (
                <Card key={user.id}>
                    <CardMedia
                        component="img" 
                        image={user.profilePicture}
                        alt={`${user.username}'s profile picture`} 
                        style={{ width: "100%", height: "auto", objectFit: "cover" }}
                    />
                    <CardContent>
                        <Typography>{user.username}</Typography>
                        <Typography>{user.bio}</Typography>
                        <Typography>Followers: {user.followerCount}</Typography>
                        <Typography>Following: {user.followingCount}</Typography>
                        <Typography>Posts: {user.postCount}</Typography>
                        {/* <Typography>
                            <a href={user.website} target="_blank">
                                Visit User Website
                            </a>
                        </Typography> */}
                    </CardContent>
                    <Button variant="contained">Edit Profile</Button>
                </Card>
            ))}
        </div>
    )
}