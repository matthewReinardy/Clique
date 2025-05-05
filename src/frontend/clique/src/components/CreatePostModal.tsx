import {
  Box,
  Button,
  Checkbox,
  DialogContent,
  FormControlLabel,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { User, UserId } from "../types/userTypes";
import { getUserById } from "../api/userApi";
import { PostCreationRequest } from "../types/postTypes";
import { createPost } from "../api/postApi";
import PhotoUpload from "./PhotoUpload";
import { toast } from "react-toastify";

export interface CreatePostDialogProps {
  open: boolean;
  onClose: () => void;
  onShare: () => void;
}

const CreatePostDialog: React.FC<CreatePostDialogProps> = ({
  open,
  onClose,
  onShare,
}) => {
  const theme = useTheme();
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [showLocationTextbox, setShowLocationTextbox] = useState(false);
  const [showTagsTextbox, setShowTagsTextbox] = useState(false);
  const [isAd, setIsAd] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = loggedInUserId as UserId;
        const response = await getUserById(userId);
        setLoggedInUser(response.data);
      } catch (error) {
        throw new Error("Function not implemented.");
      }
    };

    if (open) {
      fetchUser();
    }
  }, [open]);

  //save post to database when Share button is clicked
  const handleSubmit = async () => {
    if (!loggedInUser) return;

    if (file === null) {
      toast.error("No image selected");
      return;
    }
    if (caption === null || caption === "") {
      toast.error("No caption");
      return;
    }

    const newPost: PostCreationRequest = {
      caption,
      tags,
      location,
      authorId: loggedInUser.id.toString(),
      file,
      isAd,
    };

    try {
      const createdPost = await createPost(newPost);

      if (!createdPost) {
        toast.error("Post creation returned undefined");
      }

      toast.success("Post created successfully");

      onClose(); //close modal after success
    } catch (error) {
      toast.error(`Exception thrown during post creation: ${error}`);
    }
  };

  return (
    <Dialog fullWidth onClose={onClose} open={open}>
      <DialogTitle sx={{ backgroundColor: theme.palette.customColors.buff }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton onClick={onClose}>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            sx={{
              color: theme.palette.customColors.zomp,
              fontWeight: "bold",
              fontSize: 24,
            }}
          >
            Create New Post
          </Typography>
          {/* posts to database */}
          <Button onClick={handleSubmit}>Share</Button>
        </Box>
      </DialogTitle>

      <DialogContent
        sx={{ backgroundColor: theme.palette.customColors.champagne }}
      >
        <Grid container>
          {/* uploaded photo */}
          <Grid size={8}>
            <PhotoUpload handleFileUpload={setFile} />
          </Grid>
          {/* post content */}
          <Grid size={4}>
            <Box sx={{ display: "flex" }}>
              <AccountCircleIcon />
              <Typography>{loggedInUser?.username}</Typography>
            </Box>

            {/* caption textbox */}
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              placeholder="Enter a caption..."
              onChange={(e) => setCaption(e.target.value)}
              sx={{ marginTop: 2 }}
            />
            {/* open location textbox */}
            <Button
              sx={{ marginTop: 1, width: "100%" }}
              onClick={() => setShowLocationTextbox(true)}
            >
              Add location
            </Button>
            {showLocationTextbox && (
              <TextField
                sx={{ marginTop: 1 }}
                placeholder="Enter location..."
                onChange={(e) => setLocation(e.target.value)}
              />
            )}

            {/* open tags textbox */}
            <Button
              sx={{ marginTop: 1, width: "100%" }}
              onClick={() => setShowTagsTextbox(true)}
            >
              Add tags
            </Button>
            {showTagsTextbox && (
              <TextField
                sx={{ marginTop: 1 }}
                placeholder="Enter tags..."
                onChange={(e) => setTags(e.target.value)}
              />
            )}
            {loggedInUser?.accountType === "business" && (
              <FormControlLabel
                sx={{ marginTop: 1 }}
                control={
                  <Checkbox checked={isAd} onChange={() => setIsAd(!isAd)} />
                }
                label="Ad"
              />
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
