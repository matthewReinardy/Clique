/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  TextField,
  Typography,
  Dialog,
  Divider,
} from "@mui/material";
import {
  FavoriteBorder,
  ChatBubbleOutline,
  Flag,
  Edit,
  Delete,
  ArrowBack,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewPosts = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState<any>(null);
  const [editPost, setEditPost] = useState<any>(null);
  const navigate = useNavigate();

  const fetchPosts = async (userId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/posts/user/${userId}`
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    const authData = localStorage.getItem("authData");
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      setUser(parsedAuthData);
      fetchPosts(parsedAuthData.userId);
    }
  }, []);

  const getMimeType = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "png":
        return "image/png";
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "gif":
        return "image/gif";
      case "webp":
        return "image/webp";
      default:
        return "image/*";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authData");
    navigate("/auth", { replace: true });
  };

  const handleDeletePost = async (postId: string) => {
    try {
      const authData = localStorage.getItem("authData");
      const parsedAuthData = JSON.parse(authData!);
      const userId = parsedAuthData.userId;
      const response = await axios.delete(
        `http://localhost:8080/api/posts/${userId}/${postId}`
      );
      if (response.status === 200) {
        fetchPosts(userId);
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const authData = localStorage.getItem("authData");
      const parsedAuthData = JSON.parse(authData!);
      const userId = parsedAuthData.userId;
      // const payload = {
      //   content: editPost.content,
      //   location: editPost.location,
      //   tags: editPost.tags.join(","),
      //   tags: editPost.tags.join(","),
      // };
      const payload = new FormData();
      // payload.append("mediaFile", editPost.mediaFileData);
      payload.append("content", editPost.content);
      payload.append("location", editPost.location);
      payload.append("tags", editPost.tags);
      const response = await axios.patch(
        `http://localhost:8080/api/posts/${userId}/${editPost.id}`,
        payload
      );
      if (response.status === 200) {
        setEditPost(null);
        fetchPosts(userId);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <Grid container spacing={2} px={4} py={6}>
      {/* Posts feed */}
      <Grid item xs={12} md={6} mx="auto">
        {posts.map((post: any) => {
          const mimeType = getMimeType(post.mediaFileName);
          const imageSrc = `data:${mimeType};base64,${post.mediaFileData}`;

          return (
            <Card key={post.id} sx={{ my: 2 }}>
              <CardHeader
                avatar={<Avatar />}
                title={post.author.username}
                action={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      onClick={() =>
                        setEditPost({ ...post, tags: post.tags || [] })
                      }
                    >
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeletePost(post.id)}>
                      <Delete />
                    </IconButton>
                    <IconButton onClick={() => console.log("Flag clicked")}>
                      <Flag />
                    </IconButton>
                  </Box>
                }
              />
              <img
                src={imageSrc}
                alt={post.mediaFileName}
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                }}
              />
              <CardActions disableSpacing>
                <IconButton>
                  <FavoriteBorder />
                  <Typography variant="body2" ml={1}></Typography>
                </IconButton>
                <IconButton>
                  <ChatBubbleOutline />
                  <Typography variant="body2" ml={1}></Typography>
                </IconButton>
              </CardActions>
              <CardContent>
                <Typography variant="body2">{post.likes} likes</Typography>
                <Typography variant="body2">
                  <strong>{post.author.username}</strong> {post.content}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  View all {post.comments.length} comments
                </Typography>
                <TextField
                  variant="standard"
                  fullWidth
                  placeholder="Add a comment..."
                />
              </CardContent>
            </Card>
          );
        })}
      </Grid>

      {/* User Info */}
      <Grid item xs={12} md={3} p={2} bgcolor="#f3f3e7">
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar />
          <Box>
            <Typography variant="subtitle1">{`${user?.userName}`}</Typography>
            <Button size="small" onClick={handleLogout}>
              Log out
            </Button>
          </Box>
        </Box>
      </Grid>

      {/* Edit Modal */}
      <Dialog
        open={!!editPost}
        onClose={() => setEditPost(null)}
        maxWidth="md"
        fullWidth
      >
        <Box p={3} bgcolor="white" mx="auto" maxWidth={800}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <IconButton onClick={() => setEditPost(null)}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h6">Edit post</Typography>
            <Button variant="contained" onClick={handleEditSubmit}>
              Save
            </Button>
          </Box>

          <Divider sx={{ my: 2 }} />

          {editPost && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={7}>
                <Box
                  bgcolor="#eee"
                  height={400}
                  borderRadius={2}
                  overflow="hidden"
                >
                  <img
                    src={`data:${getMimeType(editPost.mediaFileName)};base64,${
                      editPost.mediaFileData
                    }`}
                    alt="Post"
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
                  label="Description"
                  multiline
                  rows={5}
                  value={editPost.content}
                  onChange={(e) =>
                    setEditPost({ ...editPost, content: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Location"
                  value={editPost.location}
                  onChange={(e) =>
                    setEditPost({ ...editPost, location: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Tags (comma separated)"
                  value={editPost.tags.join(",")}
                  onChange={(e) =>
                    setEditPost({
                      ...editPost,
                      tags: e.target.value.split(",").map((tag) => tag.trim()),
                    })
                  }
                />
              </Grid>
            </Grid>
          )}
        </Box>
      </Dialog>
    </Grid>
  );
};

export default ViewPosts;
