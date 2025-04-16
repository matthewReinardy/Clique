import { Box, Button, DialogContent, Divider, IconButton, TextField, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useUserContext } from '../context/UserContext';
import { loggedInUserId } from '../types/loggedInUser';
import { User, UserId } from '../types/userTypes';
import { getUserById } from '../api/userApi';

export interface CreatePostDialogProps {
    open: boolean;
    onClose: () => void;
    onShare: () => void;
  }

  const CreatePostDialog: React.FC<CreatePostDialogProps> = ({ open, onClose, onShare }) => {
    const {fetchUserById} = useUserContext();
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [content, setContent] = useState<string>('');
    const [showLocationTextbox, setShowLocationTextbox] = useState(false)
    const [showTagsTextbox, setShowTagsTextbox] = useState(false)

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const userId = loggedInUserId as UserId;
          const response = await getUserById(userId);
          setLoggedInUser(response.data);
        } catch (error) {
          setError('Failed to fetch user');
        }
      };

      if (open) {
          fetchUser();
      }
  }, [open]);

    return (
      <Dialog fullWidth onClose={onClose} open={open}>
        <DialogTitle>
          <Box sx={{display:'flex', justifyContent:'space-between'}}>
          <IconButton onClick={onClose}>
            <ArrowBackIcon/>
            </IconButton>
            <Typography>Create New Post</Typography>
            {/* closes both upload and post modals -- TODO: post to database */}
            <Button onClick={onShare}>Share</Button> 
          </Box>
          <Divider/>
          </DialogTitle>

        <DialogContent>
          <Grid container>
            {/* uploaded photo */}
            <Grid size={8}>
              <p>X</p>
            </Grid>
            {/* post content */}
            <Grid size={4}>
              <Box sx={{display: 'flex'}}>
                <AccountCircleIcon/>
                <Typography>{loggedInUser?.username}</Typography>
              </Box>

              {/* caption textbox */}
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                defaultValue="Enter a caption..."
                sx={{marginTop: 2}}
              />
              <Divider sx={{marginTop: 2}}/>

              {/* open location textbox */}
              <Button onClick={() => setShowLocationTextbox(true)}>Add location</Button>
              {showLocationTextbox && (
                <TextField />
              )}

              {/* open tags textbox */}
              <Button onClick={() => setShowTagsTextbox(true)}>Add tags</Button>
              {showTagsTextbox && (
                <TextField />
              )}
              <Divider/>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default CreatePostDialog;

function setError(arg0: string) {
  throw new Error('Function not implemented.');
}
