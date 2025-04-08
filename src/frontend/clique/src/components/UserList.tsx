import { useUserContext } from '../context/UserContext'
import { useState } from 'react'
import { Button, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, Dialog, DialogContent, DialogTitle } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { User, defaultUser } from '../types/userTypes' 
import { createUser, updateUser } from '../api/userApi'
import CreateUserForm from './forms/CreateUser'

export default function UserList() {

    const {users, loading, error, removeUser} = useUserContext()
    const [updateOpen, setUpdateOpen] = useState(false)
    const [createOpen, setCreateOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [newUser, setNewUser] = useState<User>(defaultUser)

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
    const handleUpdateChange = (field: keyof User, value: string) => {

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

    //Handle UPDATE form submission - saving the updated user
    const handleUpdateSubmit = async () => {
        
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
                password: userToUpdate.password,
                phoneNumber: userToUpdate.phoneNumber,
                dateOfBirth: userToUpdate.dateOfBirth,
                bio: userToUpdate.bio,
                location: userToUpdate.location,
                isPrivate: false,
                isVerified: false,
                profilePicture: "",
                accountType: userToUpdate.accountType,
                followerCount: 0,
                followingCount: 0,
                postCount: 0,
            })

            alert(`The user with the id of ${userToUpdate.id} (${userToUpdate.username}) has been successfully updated!}`)
        } catch (error) {
            console.error("Error updating user:", error) 
        }
        
    }
    
    //Handle creating new user 
    const handleCreateChange = (field: keyof User, value: string) => {

        setNewUser(prevNewUser => {
            return {...prevNewUser, [field]: value}
        })
    }

    const handleCreateSubmit = async () => {

        try {
            await createUser(newUser)
            setCreateOpen(false)
            alert(`The new user ${newUser.username} has been created successfully!`)
        } catch (error) {
            console.error("Error creating user:", error)
        }
    }

    //Close the dialog
    const handleClose = () => {
        setSelectedUser(null)
        setUpdateOpen(false)
        setCreateOpen(false)
    }

    return (
        <div>
            
            <Button variant='contained'
                    onClick={() => setCreateOpen(true)}
            >
                Create New User
            </Button>

            <List>
                {users.map((user) => (
                    <ListItem key={user.id}>
                        <ListItemAvatar>
                            <Avatar alt={`${user.username}'s profile picture`} />
                        </ListItemAvatar>
                        <ListItemText 
                            primary={<Typography style={{fontWeight: 'bold'}}>{user.username}</Typography>}
                            secondary={
                                <Typography variant="body2" component="span" style={{ whiteSpace: 'pre-line' }}>
                                    {'ID: '}{user.id}
                                    {`\nName: ${user.firstName} ${user.lastName}`}
                                    {'\nAccount Type: '}{user.accountType}
                                    {'\nEmail: '}{user.email}
                                    {'\nPhone Number: '}{user.phoneNumber}
                                    {'\nPassword: '}{user.password}
                                    {'\nDOB: '}{user.dateOfBirth}
                                    {'\nLocation: '}{user.location}
                                    {'\nBio: '}{user.bio}
                                    {'\nFollower Count: '}{user.followerCount}
                                    {'\nFollowing Count: '}{user.followingCount}
                                    {'\nPost Count: '}{user.postCount}
                                    {'\nPrivate: '}{user.isPrivate.toString()}
                                    {'\nVerified: '}{user.isVerified.toString()}
                                </Typography>
                            }
                        />
                        <IconButton edge="end" onClick={() => handleDelete(user)}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton edge="end" onClick={() => {
                                setSelectedUser(user)
                                setUpdateOpen(true) }}>
                            <EditIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>

            {/* Create New User */}
            <Dialog open={createOpen} onClose={handleClose} aria-labelledby='create-user-dialog'>
                <DialogTitle id="create-user-dialog">Create New User</DialogTitle>
                <DialogContent>
                    <CreateUserForm
                        user={newUser}
                        onChange={handleCreateChange}
                        onSubmit={handleCreateSubmit}
                        isNewUser={true} //New user flag
                    />
                </DialogContent>
            </Dialog>

            {/* Update User */}
            <Dialog open={updateOpen} onClose={handleClose} aria-labelledby='edit-user-dialog'>
                <DialogTitle id="edit-user-dialog">Edit User</DialogTitle>
                <DialogContent>
                    <CreateUserForm
                        user={selectedUser ?? defaultUser} //If selected user is null, defaultUser is the fallback user
                        onChange={handleUpdateChange}
                        onSubmit={handleUpdateSubmit}
                        isNewUser={false} //Update, not new user
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}