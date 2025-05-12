/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
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
} from "@mui/material";
import { FavoriteBorder, Flag } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserFeeds = () => {
  const [feeds, setFeeds] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [user, setUser] = useState<any>(null);
  const [commentsMap, setCommentsMap] = useState<{ [postId: number]: any[] }>(
    {}
  );
  const [newCommentMap, setNewCommentMap] = useState<{
    [postId: number]: string;
  }>({});
  const navigate = useNavigate();

  const fetchFeeds = async (userId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/feed?userId=${userId}`
      );
      const feedsData = response.data;
      console.log({ feedsData });
      setFeeds(feedsData);

      // fetch comments for all posts
      for (const feed of feedsData) {
        const commentsRes = await axios.get(
          `http://localhost:8080/comments/comments/${feed.postId}`
        );
        setCommentsMap((prev) => ({
          ...prev,
          [feed.postId]: commentsRes.data,
        }));
      }
    } catch (error) {
      console.error("Error fetching feeds:", error);
    }
  };

  useEffect(() => {
    const authData = localStorage.getItem("authData");
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      setUser(parsedAuthData);
      fetchFeeds(parsedAuthData.userId);
    }
  }, []);

  const handleUserSearch = () => {
    if (searchUser.trim()) {
      navigate(`/search-user?query=${encodeURIComponent(searchUser.trim())}`);
    }
  };

  const handlePostComment = async (postId: number) => {
    const content = newCommentMap[postId];
    if (!content || !user?.userId) return;

    try {
      await axios.post(
        `http://localhost:8080/comments/${postId}?userId=${
          user.userId
        }&content=${encodeURIComponent(content)}`
      );
      setNewCommentMap((prev) => ({ ...prev, [postId]: "" }));
      fetchFeeds(user.userId); // refetch updated feeds & comments
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  const handleLike = async (postId: number) => {
    if (!user?.userId) return;

    try {
      await axios.post(
        `http://localhost:8080/api/likes/post/${postId}?userId=${user.userId}`
      );
      fetchFeeds(user.userId);
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

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

  return (
    <Grid container spacing={2} px={4} py={6}>
      <Grid item xs={12} md={6} mx="auto">
        {/* User search bar */}
        <Box display="flex" gap={2} mb={3}>
          <TextField
            fullWidth
            label="Search users"
            variant="outlined"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleUserSearch();
            }}
          />
          <Button variant="contained" onClick={handleUserSearch}>
            Search
          </Button>
        </Box>

        {feeds.map((feed: any, index) => {
          const mimeType = getMimeType(feed.mediaFileName);
          const imageSrc = `data:${mimeType};base64,${feed.mediaFileData}`;
          const comments = commentsMap[feed.postId] || [];

          return (
            <Card key={index} sx={{ my: 2 }}>
              <CardHeader
                avatar={<Avatar />}
                title={feed?.authorUsername}
                action={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton>
                      <Flag />
                    </IconButton>
                  </Box>
                }
              />
              <img
                src={imageSrc}
                alt={feed.mediaFileName}
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                }}
              />
              <CardActions disableSpacing>
                <IconButton onClick={() => handleLike(feed.postId)}>
                  <FavoriteBorder />
                  <Typography variant="body2" ml={1}>
                    {feed.likeCount}
                  </Typography>
                </IconButton>
                {/* <IconButton>
                  <ChatBubbleOutline />
                  <Typography variant="body2" ml={1}></Typography>
                </IconButton> */}
              </CardActions>
              <CardContent>
                {/* Tags */}
                {feed.tags?.length > 0 && (
                  <Box mb={1}>
                    {feed.tags.map((tag: string, idx: number) => (
                      <Typography
                        key={idx}
                        variant="caption"
                        color="text.secondary"
                        sx={{ mr: 1 }}
                      >
                        #{tag}
                      </Typography>
                    ))}
                  </Box>
                )}

                {/* Likes */}
                <Typography variant="body2">{feed.likeCount} likes</Typography>

                {/* Comments */}
                {comments.map((comment: any, index: number) => {
                  const [y, m, d, h, min, s] = comment.createdAt;
                  const date = new Date(y, m - 1, d, h, min, s);
                  const formattedDate = date.toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  });

                  return (
                    <Box key={index} mt={1}>
                      <Typography variant="body2">
                        <strong>{comment.username}:</strong> {comment.content}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formattedDate}
                      </Typography>
                    </Box>
                  );
                })}

                {/* Add Comment */}
                <Box mt={2} display="flex" gap={1}>
                  <TextField
                    variant="standard"
                    fullWidth
                    placeholder="Add a comment..."
                    value={newCommentMap[feed.postId] || ""}
                    onChange={(e) =>
                      setNewCommentMap((prev) => ({
                        ...prev,
                        [feed.postId]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handlePostComment(feed.postId);
                      }
                    }}
                  />
                  <Button
                    onClick={() => handlePostComment(feed.postId)}
                    disabled={!newCommentMap[feed.postId]?.trim()}
                  >
                    Post
                  </Button>
                </Box>
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
    </Grid>
  );
};

export default UserFeeds;
