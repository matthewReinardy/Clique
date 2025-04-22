import {
  Dialog,
  Box,
  IconButton,
  Typography,
  Button,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";

interface CreatePostDialogProps {
  open: boolean;
  onClose: () => void;
  onShare: () => void;
  selectedImage: File | null;
}

export default function CreatePostDialog({
  open,
  onClose,
  onShare,
  selectedImage,
}: CreatePostDialogProps) {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");

  const handleShare = async () => {
    console.log("Shared:", {
      description,
      selectedImage,
      location,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    });
    const data = new FormData();
    data.append("mediaFile", selectedImage as Blob);
    data.append("content", description);
    data.append("location", location);
    data.append(
      "tags",
      tags
        .split(",")
        .map((tag) => tag.trim())
        .join(",")
    );
    const authData = localStorage.getItem("authData");
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      const result = await axios.post(
        `http://localhost:8080/api/posts/${parsedAuthData.userId}`,
        data
      );
      if (result.status === 200) {
        onShare();
        setDescription("");
        setLocation("");
        setTags("");
      }
    }
  };

  const handleBack = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box p={3} bgcolor="white" mx="auto" my={4} maxWidth={800}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <IconButton onClick={handleBack}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6">Create new post</Typography>
          <Button variant="contained" onClick={handleShare}>
            Share
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Box bgcolor="#eee" height={400} borderRadius={2} overflow="hidden">
              {selectedImage ? (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                >
                  No image selected
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              label="Write a caption..."
              multiline
              rows={5}
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Location"
              variant="outlined"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Tags (comma separated)"
              variant="outlined"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}
