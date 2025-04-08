//THIS will be the general form for creating and updating a user - 
//It will alyout the TextFields that are required for both, and since they are the same so far, it will be the same component
//This will then have props passed to it by the UserList component 

//Change setOpen in UserList to more descriptive (updateOpen)
//Get rid of websiteURL field
import { TextField, DialogActions, Button } from '@mui/material'
import { User } from '../../types/userTypes'

interface CreateUserFormProps {
    user: User;
    onChange: (field: keyof User, value: string) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    isNewUser: boolean;
}

export default function CreateUserForm({
    user,
    onChange,
    onSubmit,
    isNewUser
}: CreateUserFormProps) {
    return (
        <form onSubmit={onSubmit}>
            <TextField
                label="Username"
                value={user.username || ""}
                onChange={(e) => onChange('username', e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="First name"
                value={user.firstName || ""}
                onChange={(e) => onChange('firstName', e.target.value)}
                fullWidth
                margin="normal"
                autoFocus
            />
            <TextField
                label="Last name"
                value={user.lastName || ""}
                onChange={(e) => onChange('lastName', e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Email"
                value={user.email || ""}
                onChange={(e) => onChange('email', e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Phone Number"
                value={user.phoneNumber || ""}
                onChange={(e) => onChange('phoneNumber', e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Password"
                value={user.password || ""}
                onChange={(e) => onChange('password', e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="DOB"
                value={user.dateOfBirth || ""}
                onChange={(e) => onChange('dateOfBirth', e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Location"
                value={user.location || ""}
                onChange={(e) => onChange('location', e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Bio"
                value={user.bio || ""}
                onChange={(e) => onChange('bio', e.target.value)}
                fullWidth
                margin="normal"
            />
            <DialogActions>
                <Button type="submit">
                    {isNewUser ? 'Create User' : 'Save Changes'}
                </Button>
            </DialogActions>
        </form>
    )
}
