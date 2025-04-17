import { useEffect, useState } from "react";
import FeedCard from "../components/FeedCard";
import PageWrapper from "./PageWrapper";
import { getPosts } from "../api/postApi";
import { AllPosts } from "../types/postTypes";
import { Box } from "@mui/material";

const Feed = () => {
  const [posts, setPosts] = useState<AllPosts[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPosts();
        if (!response) throw new Error(`HTTP error!`);
        console.log(response);
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(posts);

  return (
    <PageWrapper>
      <h1>Feed</h1>
      {posts?.map((item, index) => {
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
      })}
    </PageWrapper>
  );
};

export default Feed;
