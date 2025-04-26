import { useEffect, useState } from "react";
import FeedCard from "../components/FeedCard";
import PageWrapper from "./PageWrapper";
import { getFollowerPosts, getPosts } from "../api/postApi";
import { AllPostsFolowers } from "../types/postTypes";
import { Box } from "@mui/material";
import { loggedInUserId } from "../types/loggedInUser";
import { UserId } from "../types/userTypes";

const MyFeed = () => {
  const userId = loggedInUserId as UserId;
  const [posts, setPosts] = useState<AllPostsFolowers[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getFollowerPosts(userId);
        if (!response) throw new Error(`HTTP error!`);
        setLoading(false);
        const sortedData = response.data.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
        setPosts(sortedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PageWrapper>
      <h1>My Feed</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        posts?.map((item, index) => {
          return (
            <Box sx={{ padding: 2 }}>
              <FeedCard
                key={index}
                username={item.authorUsername}
                date={item.createdAt}
                content={item.caption}
                location={item.location}
                likeCount={item.likeCount}
                image={item.image}
                tag={item.tag}
                postId={item.id}
              />
            </Box>
          );
        })
      )}
    </PageWrapper>
  );
};

export default MyFeed;
