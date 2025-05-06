import { TextField, DialogActions, Button } from '@mui/material'
import { User } from '../../types/userTypes'
import { useState } from 'react'
import PhotoUpload from '../PhotoUpload';

interface CreateUserFormProps {
    user: User;
    onChange: (field: keyof User, value: string) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>, uploadedFile: File | null) => void;
    isNewUser: boolean;
  }

export default function CreateUserForm({
    user,
    onChange,
    onSubmit,
    isNewUser
}: CreateUserFormProps) {
    // State to hold validation errors
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    // Validation function
    const validate = (): boolean => {
        const newErrors: Record<string, string> = {}

        if (!user.username) newErrors.username = "Username is required"
        if (!user.firstName) newErrors.firstName = "First name is required"
        if (!user.lastName) newErrors.lastName = "Last name is required"
        if (!user.email) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            newErrors.email = "Email is not valid"
        }
        if (!user.phoneNumber) {
            newErrors.phoneNumber = "Phone number is required";
        } else if (!/^\d{3}-\d{3}-\d{4}$/.test(user.phoneNumber)) {
            newErrors.phoneNumber = "Phone number must be in the format 123-456-7890";
        }
        if (!user.password) newErrors.password = "Password is required"
        if (!user.dateOfBirth) {
            newErrors.dateOfBirth = "Date of birth is required";
        } else if (!/^\d{2}-\d{2}-\d{4}$/.test(user.dateOfBirth)) {
            newErrors.dateOfBirth = "Date of birth must be in the format MM-DD-YYYY";
        }
        if (!user.location) newErrors.location = "Location is required"

        //If there are errors, set them in the state and return false
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return false
        }

        return true
    }

    // Handle form submit
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // Validate fields before submitting
        if (validate()) {
            onSubmit(event, uploadedFile)  // Only call onSubmit if validation passes
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Username"
                value={user.username || ""}
                onChange={(e) => onChange('username', e.target.value)}
                fullWidth
                margin="normal"
                error={Boolean(errors.username)}
                helperText={errors.username}
            />
            <TextField
                label="First name"
                value={user.firstName || ""}
                onChange={(e) => onChange('firstName', e.target.value)}
                fullWidth
                margin="normal"
                autoFocus
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
            />
            <TextField
                label="Last name"
                value={user.lastName || ""}
                onChange={(e) => onChange('lastName', e.target.value)}
                fullWidth
                margin="normal"
                error={Boolean(errors.lastName)}
                helperText={errors.lastName}
            />
            <TextField
                label="Email"
                value={user.email || ""}
                onChange={(e) => onChange('email', e.target.value)}
                fullWidth
                margin="normal"
                error={Boolean(errors.email)}
                helperText={errors.email}
            />
            <TextField
                label="Phone Number"
                value={user.phoneNumber || ""}
                onChange={(e) => onChange('phoneNumber', e.target.value)}
                fullWidth
                margin="normal"
                error={Boolean(errors.phoneNumber)}
                helperText={errors.phoneNumber}
            />
            <TextField
                label="Password"
                value={user.password || ""}
                onChange={(e) => onChange('password', e.target.value)}
                fullWidth
                margin="normal"
                error={Boolean(errors.password)}
                helperText={errors.password}
            />
            <TextField
                label="DOB"
                value={user.dateOfBirth || ""}
                onChange={(e) => onChange('dateOfBirth', e.target.value)}
                fullWidth
                margin="normal"
                error={Boolean(errors.dateOfBirth)}
                helperText={errors.dateOfBirth}
            />
            <TextField
                label="Location"
                value={user.location || ""}
                onChange={(e) => onChange('location', e.target.value)}
                fullWidth
                margin="normal"
                error={Boolean(errors.location)}
                helperText={errors.location}
            />
            <TextField
                label="Bio"
                value={user.bio || ""}
                onChange={(e) => onChange('bio', e.target.value)}
                fullWidth
                margin="normal"
            />
            <PhotoUpload handleFileUpload={setUploadedFile} />
            <DialogActions>
                <Button type="submit">
                    {isNewUser ? 'Create User' : 'Save Changes'}
                </Button>
            </DialogActions>
        </form>
    )
}
