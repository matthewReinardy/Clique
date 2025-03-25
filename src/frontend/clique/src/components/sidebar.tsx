// import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SelectPhotoDialog from './SelectPhotoModal';
import CreatePostDialog from './CreatePostModal';
import { useState } from 'react';

export default function SideBar() {
  //define state
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);

  const handleOnShare = () => {
    setPhotoModalOpen(false)
    setPostModalOpen(false)
  }

  const openPhotoModal = () => setPhotoModalOpen(true);
  const closePhotoModal = () => setPhotoModalOpen(false);

  const openPostModal = () => {
    setPostModalOpen(true);   //open create post modal
  };

  const closePostModal = () => setPostModalOpen(false);

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {['Home', 'Notifications', 'Create Post', 'My Profile'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={text === 'Create Post' ? openPhotoModal  : undefined}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button>Log Out</Button>
    </Box>
  );

  return (
    <div>
      <Drawer variant='permanent'>
        {DrawerList}
      </Drawer>

      {/* modal to select photo to uplaod */}
      <SelectPhotoDialog open={photoModalOpen} onClose={closePhotoModal} onUpload={openPostModal} />

      {/* modal to create a post */}
      <CreatePostDialog open={postModalOpen} onClose={closePostModal} onShare={handleOnShare} />
    </div>

  );
}
