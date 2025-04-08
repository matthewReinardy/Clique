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
import { PostCreationRequest } from '../types/postTypes';
import { userPostContext } from '../context/PostContext';
import { create } from '@mui/material/styles/createTransitions';

export interface CreatePostDialogProps {
    open: boolean;
    onClose: () => void;
    onShare: () => void;
  }

  const CreatePostDialog: React.FC<CreatePostDialogProps> = ({ open, onClose, onShare }) => {
    const { handleCreatePost } = userPostContext();
    const {fetchUserById} = useUserContext();
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [caption, setCaption] = useState<string>('');
    const [tag, setTag] = useState<string>('');
    const [location, setLocation] = useState<string>('');
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

  //save post to database when Share button is clicked
  const handleSharePost = async () => {
    if (!loggedInUser) return;

    const newPost: PostCreationRequest = {
      caption,
      tag,
      location,
      mediaFileName: '', //TODO: change later
      authorId: loggedInUser.id
    };

    console.log('Attempting to create post with: ', newPost);

    try {
      const createdPost = await handleCreatePost(newPost);

      if (!createdPost) {
       console.error('Post creation returned undefined');
      }

      console.log('Post created successfully: ', createdPost);

      onClose(); //close modal after success
    } catch (error) {
      console.error('Exception thrown during post creation:', error);
    }
  };

    return (
      <Dialog fullWidth onClose={onClose} open={open}>
        <DialogTitle>
          <Box sx={{display:'flex', justifyContent:'space-between'}}>
          <IconButton onClick={onClose}>
            <ArrowBackIcon/>
            </IconButton>
            <Typography>Create New Post</Typography>
            {/* posts to database */}
            <Button onClick={handleSharePost}>Share</Button> 
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
                placeholder="Enter a caption..."
                onChange={(e) => setCaption(e.target.value)}
                sx={{marginTop: 2}}
              />
              <Divider sx={{marginTop: 2}}/>

              {/* open location textbox */}
              <Button onClick={() => setShowLocationTextbox(true)}>Add location</Button>
              {showLocationTextbox && (
                <TextField 
                placeholder="Enter location..."
                onChange={(e) => setLocation(e.target.value)}
                />
              )}

              {/* open tags textbox */}
              <Button onClick={() => setShowTagsTextbox(true)}>Add tags</Button>
              {showTagsTextbox && (
                <TextField 
                placeholder="Enter tags..."
                onChange={(e) => setTag(e.target.value)}/>
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
