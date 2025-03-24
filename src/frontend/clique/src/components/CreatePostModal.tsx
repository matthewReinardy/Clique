import { Box, Button, DialogContent, Divider, IconButton, TextField, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import Grid from '@mui/material/Grid2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export interface CreatePostDialogProps {
    open: boolean;
    onClose: () => void;
  }

  const CreatePostDialog: React.FC<CreatePostDialogProps> = ({ open, onClose }) => {

    return (
      <Dialog fullWidth onClose={onClose} open={open}>
        <DialogTitle>
          <Box sx={{display:'flex', justifyContent:'space-between'}}>
          <IconButton onClick={onClose}>
            <ArrowBackIcon/>
            </IconButton>
            <Typography>Create New Post</Typography>
            <Button>Share</Button>
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
                <Typography>username</Typography>
              </Box>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                defaultValue="Enter a caption..."
                sx={{marginTop: 2}}
              />
              <Divider sx={{marginTop: 2}}/>
              <Button>Add location</Button>
              <Button>Add tags</Button>
              <Divider/>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default CreatePostDialog;