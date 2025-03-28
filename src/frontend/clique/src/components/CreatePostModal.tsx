import { Box, Button, DialogContent, Divider, IconButton, TextField, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useUserContext } from '../context/UserContext';
import { loggedInUserId } from '../types/loggedInUser';

export interface CreatePostDialogProps {
    open: boolean;
    onClose: () => void;
    onShare: () => void;
  }

  const CreatePostDialog: React.FC<CreatePostDialogProps> = ({ open, onClose, onShare }) => {
    const {users} = useUserContext()
    const loggedInUser = users.find((element) => element.id === loggedInUserId)

    const [showLocationTextbox, setShowLocationTextbox] = useState(false)
    const [showTagsTextbox, setShowTagsTextbox] = useState(false)

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