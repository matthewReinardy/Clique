import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';

export interface CreatePostDialogProps {
    open: boolean;
    onClose: () => void;
  }

  const CreatePostDialog: React.FC<CreatePostDialogProps> = ({ open, onClose }) => {
    return (
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>Create a Post</DialogTitle>
      </Dialog>
    );
  };
  
  export default CreatePostDialog;