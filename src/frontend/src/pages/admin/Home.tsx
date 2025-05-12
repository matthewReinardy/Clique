import { Container } from "@mui/material";
import SideBar from "../../components/sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UserFeeds from "../../components/UserFeeds";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const authData = localStorage.getItem("authData");
    if (authData) {
      navigate("/", { replace: true });
    } else {
      navigate("/auth", { replace: true });
    }
  }, [navigate]);
  return (
    <Container>
      <UserFeeds />
      <SideBar />
    </Container>
  );
};

export default Home;
