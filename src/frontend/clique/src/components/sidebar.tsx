// import * as React from 'react';
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import SelectPhotoDialog from "./SelectPhotoModal";
import CreatePostDialog from "./CreatePostModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  //define state
  const navigate = useNavigate();
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);

  //open/close both upload and post modal
  const handleOnShare = () => {
    setPhotoModalOpen(false);
    setPostModalOpen(false);
  };

  const openPhotoModal = () => setPhotoModalOpen(true);
  const closePhotoModal = () => setPhotoModalOpen(false);

  const openPostModal = () => {
    setPostModalOpen(true); //open create post modal
  };

  const closePostModal = () => setPostModalOpen(false);

  const closeAll = () => {
    setPostModalOpen(false);
    setPhotoModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem key={"Home"} disablePadding>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemIcon>{<InboxIcon />}</ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"My Feed"} disablePadding>
          <ListItemButton onClick={() => navigate("/myFeed")}>
            <ListItemIcon>{<InboxIcon />}</ListItemIcon>
            <ListItemText primary={"My Feed"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"Notifications"} disablePadding>
          <ListItemButton onClick={() => navigate("/notifications")}>
            <ListItemIcon>{<InboxIcon />}</ListItemIcon>
            <ListItemText primary={"Notifications"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"Create Post"} disablePadding>
          <ListItemButton onClick={openPhotoModal}>
            <ListItemIcon>{<InboxIcon />}</ListItemIcon>
            <ListItemText primary={"Create Post"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"My Profile"} disablePadding>
          <ListItemButton onClick={() => navigate("/profile")}>
            <ListItemIcon>{<InboxIcon />}</ListItemIcon>
            <ListItemText primary={"My Profile"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"User List"} disablePadding>
          <ListItemButton onClick={() => navigate("/userlist")}>
            <ListItemIcon>{<InboxIcon />}</ListItemIcon>
            <ListItemText primary={"User List"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Button onClick={handleLogout}>Log Out</Button>
    </Box>
  );

  return (
    <div>
      <Drawer variant="permanent">{DrawerList}</Drawer>

      {/* modal to select photo to uplaod */}
      <SelectPhotoDialog
        open={photoModalOpen}
        onClose={closePhotoModal}
        onUpload={openPostModal}
      />

      {/* modal to create a post */}
      <CreatePostDialog
        open={postModalOpen}
        onClose={closePostModal}
        onCloseAll={closeAll}
        onShare={handleOnShare}
      />
    </div>
  );
}
