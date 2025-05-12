/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchUserResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [user, setUser] = useState<any>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const usernameQuery = searchParams.get("query");

  // Load user from local storage
  useEffect(() => {
    const authData = localStorage.getItem("authData");
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      setUser(parsedAuthData);
    }
  }, []);

  // Fetch users from API
  const fetchSearchResults = (query: string, currentUserId: string) => {
    axios
      .get(
        `http://localhost:8080/users/users/search?username=${encodeURIComponent(
          query
        )}&currentUserId=${currentUserId}`
      )
      .then((res) => {
        setSearchResults(res.data);
      })
      .catch((err) => {
        console.error("Error fetching search results:", err);
      });
  };

  // Trigger search on mount or query change
  useEffect(() => {
    const authData = localStorage.getItem("authData");
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      if (usernameQuery) {
        fetchSearchResults(usernameQuery, parsedAuthData.userId);
      }
    }
  }, [usernameQuery]);

  const handleUserSearch = () => {
    if (searchUser.trim()) {
      navigate(`/search-user?query=${encodeURIComponent(searchUser.trim())}`);
    }
  };

  const handleFollow = async (targetUserId: number) => {
    try {
      await axios.post(
        `http://localhost:8080/api/follow/${targetUserId}?userId=${user.userId}`
      );
      if (usernameQuery) {
        fetchSearchResults(usernameQuery, user.userId);
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async (targetUserId: number) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/follow/${targetUserId}?userId=${user.userId}`
      );
      if (usernameQuery) {
        fetchSearchResults(usernameQuery, user.userId);
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authData");
    navigate("/auth", { replace: true });
  };

  return (
    <Grid container spacing={2} px={4} py={6}>
      {/* Search bar */}
      <Grid item xs={12} md={6} mx="auto">
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

        {/* Search results */}
        {searchResults.map((result: any) => (
          <Card key={result.id} sx={{ my: 2 }}>
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar src={result.profilePicture || ""} />
                <Box>
                  <Typography variant="subtitle1">{result.username}</Typography>
                  <Typography variant="body2">
                    {result.firstName} {result.lastName}
                  </Typography>
                </Box>
              </Box>
              {result.following ? (
                <Button
                  variant="outlined"
                  onClick={() => handleUnfollow(result.id)}
                >
                  Unfollow
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={() => handleFollow(result.id)}
                >
                  Follow
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </Grid>

      {/* User Info */}
      <Grid item xs={12} md={3} p={2} bgcolor="#f3f3e7">
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar />
          <Box>
            <Typography variant="subtitle1">{user?.userName}</Typography>
            <Button size="small" onClick={handleLogout}>
              Log out
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SearchUserResults;
