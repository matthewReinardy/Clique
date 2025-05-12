import { Container } from "@mui/material";
import ViewPosts from "../../components/ViewPosts";
import SideBar from "../../components/sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const authData = localStorage.getItem("authData");
    if (authData) {
      navigate("/profile", { replace: true });
    } else {
      navigate("/auth", { replace: true });
    }
  }, [navigate]);
  return (
    <Container>
      <ViewPosts />
      <SideBar />
    </Container>
  );
};

export default Profile;
