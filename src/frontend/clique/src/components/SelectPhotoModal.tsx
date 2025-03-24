import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';

export interface SelectPhotoDialogProps {
    open: boolean;
    onClose: () => void;
    onUpload: () => void;
}

const SelectPhotoDialog: React.FC<SelectPhotoDialogProps> = ({ open, onClose, onUpload }) => {
    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Create New Post</DialogTitle>
            <Button>Select from computer</Button>
            
            {/* opens CreatePostModal */}
            <Button onClick={onUpload}>Upload</Button>
        </Dialog>
    );
};

export default SelectPhotoDialog;       