import { useEffect, useState } from "react";
import FeedCard from "../components/FeedCard";
import PageWrapper from "./PageWrapper";
import { getPosts } from "../api/postApi";
import { AllPosts } from "../types/postTypes";
import { Box } from "@mui/material";

const Feed = () => {
  const [posts, setPosts] = useState<AllPosts[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getPosts();
        if (!response) throw new Error(`HTTP error!`);
        setLoading(false);
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PageWrapper>
      <h1>Feed</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        posts?.map((item, index) => {
          return (
            <Box sx={{ padding: 2 }}>
              <FeedCard
                key={index}
                username={item.author.username}
                date={item.createdAt}
                content={item.caption}
                location={item.location}
                likeCount={item.likeCount}
              />
            </Box>
          );
        })
      )}
    </PageWrapper>
  );
};

export default Feed;
