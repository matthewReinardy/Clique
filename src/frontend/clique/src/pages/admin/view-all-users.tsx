import { useUserContext } from '../../context/UserContext'
import { useState } from 'react'
import { Button, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { User, defaultUser } from '../../types/userTypes' 
import { updateUser } from '../../api/userApi'

export default function UserList() {

    const {users, loading, error, removeUser} = useUserContext()
    const [open, setOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    if (loading) {
        return <Typography>Loading...</Typography>
    }

    if (error) {
        return <Typography>Error: {error}</Typography>
    }

    //Handle user deletion
    const handleDelete = async (user: User) => {
        if (window.confirm(`Are you sure you want to DELETE ${user.username}'s account?`)) {
            await removeUser(user.id)
        }
    }

    //Handle updating field inputs
    const handleChange = async (field: keyof User, value: string) => {

        if (selectedUser && selectedUser[field] === value) return //Prevents unnecessary updates

        setSelectedUser(prevSelectedUser => {
            if (!prevSelectedUser) {
                //If prevSelectedUser is null, return early with a default user (excluding the field that's being changed)
                return { ...defaultUser, [field]: value };
            }
        
            //Update the field and preserve other properties
            return {
                ...prevSelectedUser,
                [field]: value || prevSelectedUser[field], //Keep old value if empty string
            }
        })
    }

    //Close the dialog
    const handleClose = () => {
        setSelectedUser(null)
        setOpen(false)
    }

    //Handle form submission - saving the updated user
    const handleSubmit = async (user: User) => {
        
        if (!selectedUser) {
            console.error("selected user is null, cannot update.")
            return
        }

        const userToUpdate = selectedUser ?? defaultUser //Avoid null checks 

        try {
            await updateUser(userToUpdate.id, {
                firstName: userToUpdate.firstName,
                lastName: userToUpdate.lastName,
                username: userToUpdate.username,
                email: userToUpdate.email,
                phoneNumber: userToUpdate.phoneNumber,
                website: userToUpdate.website,
                bio: userToUpdate.bio,
            })

            setOpen(false)
            alert(`The user with the id of ${user.id} (${user.username}) has been successfully updated!}`)
        } catch (error) {
            console.error("Error updating user:", error) 
            alert("There was an error updating the user. Please try again later.")
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
                        <IconButton edge="end" onClick={() => handleDelete(user)}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton edge="end" onClick={() => {
                                setSelectedUser(user)
                                setOpen(true) }}>
                            <EditIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit User Information</DialogTitle>
                <DialogContent>
                    <TextField
                        label="First name"
                        value={selectedUser?.firstName || ""}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Last name"
                        value={selectedUser?.lastName || ""}
                        onChange={(e) => handleChange('lastName', e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Username"
                        value={selectedUser?.username || ""}
                        onChange={(e) => handleChange('username', e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Phone Number"
                        value={selectedUser?.phoneNumber || ""}
                        onChange={(e) => handleChange('phoneNumber', e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        value={selectedUser?.email || ""}
                        onChange={(e) => handleChange('email', e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Website Link"
                        value={selectedUser?.website || ""}
                        onChange={(e) => handleChange('website', e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Bio"
                        value={selectedUser?.bio || ""}
                        onChange={(e) => handleChange('bio', e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose || ""}>
                        Cancel
                    </Button>
                    <Button onClick={() => handleSubmit(selectedUser!) /*selectedUser! will never be null/undefined */}> 
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}