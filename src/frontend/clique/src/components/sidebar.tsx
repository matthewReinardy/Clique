// import * as React from 'react';
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CreatePostDialog from "./CreatePostModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import { isAdmin, isUserOrBusiness } from "../session/userRole";

export default function SideBar() {
  const theme = useTheme();

  //define state
  const navigate = useNavigate();
  const [postModalOpen, setPostModalOpen] = useState(false);

  //open/close both upload and post modal
  const handleOnShare = () => {
    setPostModalOpen(false);
  };

  const closePostModal = () => setPostModalOpen(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        backgroundColor: theme.palette.customColors.buff,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      role="presentation"
    >
      <List>
        {isUserOrBusiness && (
          <>
            <Box sx={{ width: "100%", textAlign: "center" }}>
              <img src="/icons/clique-logo.svg" alt="logo" width={200} />
            </Box>
            <ListItem key={"Home"} disablePadding>
              <ListItemButton onClick={() => navigate("/")}>
                <ListItemIcon>
                  <img src="/icons/home.svg" alt="logo" width={30} />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItemButton>
            </ListItem>
            <ListItem key={"My Feed"} disablePadding>
              <ListItemButton onClick={() => navigate("/myFeed")}>
                <ListItemIcon>
                  <img src="/icons/explore.svg" alt="logo" width={30} />
                </ListItemIcon>
                <ListItemText primary={"My Feed"} />
              </ListItemButton>
            </ListItem>
            <ListItem key={"Notifications"} disablePadding>
              <ListItemButton onClick={() => navigate("/notifications")}>
                <ListItemIcon>
                  <img src="/icons/settings.svg" alt="logo" width={30} />
                </ListItemIcon>
                <ListItemText primary={"Notifications"} />
              </ListItemButton>
            </ListItem>
            <ListItem key={"Create Post"} disablePadding>
              <ListItemButton onClick={() => setPostModalOpen(true)}>
                <ListItemIcon>
                  <img src="/icons/plus.svg" alt="logo" width={30} />
                </ListItemIcon>
                <ListItemText primary={"Create Post"} />
              </ListItemButton>
            </ListItem>
            <ListItem key={"My Profile"} disablePadding>
              <ListItemButton onClick={() => navigate("/profile")}>
                <ListItemIcon>
                  <img src="/icons/profile.svg" alt="logo" width={30} />
                </ListItemIcon>
                <ListItemText primary={"My Profile"} />
              </ListItemButton>
            </ListItem>
          </>
        )}
        {isAdmin && (
          <ListItem key={"User List"} disablePadding>
            <ListItemButton onClick={() => navigate("/userlist")}>
              <ListItemIcon>
                <img src="/icons/settings.svg" alt="logo" width={30} />
              </ListItemIcon>
              <ListItemText primary={"User List"} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
      <Button sx={{ width: "100%" }} onClick={handleLogout}>
        Log Out
      </Button>
    </Box>
  );

  return (
    <div>
      <Drawer variant="permanent">{DrawerList}</Drawer>

      {/* modal to create a post */}
      <CreatePostDialog
        open={postModalOpen}
        onClose={closePostModal}
        onShare={handleOnShare}
      />
    </div>
  );
}
