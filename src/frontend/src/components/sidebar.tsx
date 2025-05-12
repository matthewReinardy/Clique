import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import SelectPhotoDialog from "./SelectPhotoModal";
import CreatePostDialog from "./CreatePostModal";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const navigate = useNavigate();

  const handleOnShare = () => {
    setPhotoModalOpen(false);
    setPostModalOpen(false);
    setSelectedImage(null);
  };

  const openPhotoModal = () => setPhotoModalOpen(true);
  const closePhotoModal = () => setPhotoModalOpen(false);

  const openPostModal = () => {
    setPostModalOpen(true);
  };

  const closePostModal = () => setPostModalOpen(false);

  const menuItems = [
    {
      label: "Home",
      action: () => {
        navigate("/");
      },
    },
    { label: "Notifications", action: () => {} },
    { label: "Create Post", action: openPhotoModal },
    {
      label: "My Profile",
      action: () => {
        navigate("/profile");
      },
    },
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton onClick={item.action}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* <Button>Log Out</Button> */}
    </Box>
  );

  return (
    <div>
      <Drawer variant="permanent">{DrawerList}</Drawer>

      <SelectPhotoDialog
        open={photoModalOpen}
        onClose={closePhotoModal}
        onUpload={openPostModal}
        setSelectedImage={setSelectedImage}
      />

      <CreatePostDialog
        open={postModalOpen}
        onClose={closePostModal}
        onShare={handleOnShare}
        selectedImage={selectedImage}
      />
    </div>
  );
}
