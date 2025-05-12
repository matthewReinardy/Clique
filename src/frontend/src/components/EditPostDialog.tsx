/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useState, useEffect } from "react";
import axios from "axios";

interface EditPostDialogProps {
  open: boolean;
  onClose: () => void;
  onUpdate: () => void;
  post: any;
}

export default function EditPostDialog({
  open,
  onClose,
  onUpdate,
  post,
}: EditPostDialogProps) {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (post) {
      setDescription(post.content || "");
      setLocation(post.location || "");
      setTags(post.tags?.join(", ") || "");
    }
  }, [post]);

  const handleUpdate = async () => {
    const authData = localStorage.getItem("authData");
    if (!authData || !post) return;

    const parsedAuthData = JSON.parse(authData);

    try {
      const result = await axios.put(
        `http://localhost:8080/api/posts/${parsedAuthData.userId}/${post.id}`,
        {
          content: description,
          location,
          tags: tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag),
        }
      );

      if (result.status === 200) {
        onUpdate();
        onClose();
      }
    } catch (error) {
      console.error("Failed to update post", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box p={3} bgcolor="white" mx="auto" my={4} maxWidth={800}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <IconButton onClick={onClose}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6">Edit post</Typography>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Box bgcolor="#eee" height={400} borderRadius={2} overflow="hidden">
              <img
                src={`data:image/jpeg;base64,${post.mediaFileData}`}
                alt={post.mediaFileName}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              label="Edit caption..."
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
