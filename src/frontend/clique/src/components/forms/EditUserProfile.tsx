import { TextField, DialogActions, Button } from '@mui/material'
import { useState } from 'react'
import { User } from '../../types/userTypes'
import PhotoUpload from '../PhotoUpload'

interface EditProfileFormProps {
    user: Pick<User, 'firstName' | 'lastName' | 'bio' | 'profilePicture'>;
    onChange: (field: keyof EditProfileFormProps['user'], value: string) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>, uploadedFile: File | null) => void;
}

export default function EditProfileForm({
    user,
    onChange,
    onSubmit
}: EditProfileFormProps) {
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [uploadedFile, setUploadedFile] = useState<File | null>(null)

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {}

        if (!user.firstName) newErrors.firstName = 'First name is required'
        if (!user.lastName) newErrors.lastName = 'Last name is required'
        if (user.bio && user.bio.length > 250) newErrors.bio = 'Bio must be under 250 characters'

        if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return false
        }
        return true
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (validate()) {
            onSubmit(event, uploadedFile)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="First Name"
                value={user.firstName}
                onChange={(e) => onChange('firstName', e.target.value)}
                fullWidth
                margin="normal"
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
            />
            <TextField
                label="Last Name"
                value={user.lastName}
                onChange={(e) => onChange('lastName', e.target.value)}
                fullWidth
                margin="normal"
                error={Boolean(errors.lastName)}
                helperText={errors.lastName}
            />
            <TextField
                label="Bio"
                value={user.bio || ''}
                onChange={(e) => onChange('bio', e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={3}
                error={Boolean(errors.bio)}
                helperText={errors.bio || 'Max 250 characters'}
            />
            <PhotoUpload handleFileUpload={setUploadedFile} />

            <DialogActions>
                <Button type="submit" variant="contained">Save Profile</Button>
            </DialogActions>
        </form>
    )
}
