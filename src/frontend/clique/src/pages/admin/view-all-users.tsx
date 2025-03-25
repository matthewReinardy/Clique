import { useUserContext } from '../../context/UserContext'
import { Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { UserId } from '../../types/userTypes' 

export default function UserList() {

    const {users, loading, error, removeUser} = useUserContext()

    if (loading) {
        return <Typography>Loading...</Typography>
    }

    if (error) {
        return <Typography>Error: {error}</Typography>
    }

    const handleDelete = async (userId: UserId) => {
        if (window.confirm("Are you sure you want to delete this user's account?")) {
            await removeUser(userId)
        }
    }

    return (
        <div>
            <List>
                {users.map((user) => (
                    <ListItem key={user.id}>
                        <ListItemAvatar>
                            <Avatar alt={`${user.username}'s profile picture`} />
                        </ListItemAvatar>
                        <ListItemText 
                            primary={user.username}
                            secondary={
                                <Typography variant="body2" component="span" style={{ whiteSpace: 'pre-line' }}>
                                    {`${user.firstName} ${user.lastName}`}
                                    {'\n'}{user.phoneNumber}
                                    {'\n'}{user.email}
                                    {'\n'}{user.bio}
                                    {'\n'}{user.website}
                                </Typography>
                            }
                        />
                        <IconButton edge="end" onClick={() => handleDelete(user.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </div>
    )
}