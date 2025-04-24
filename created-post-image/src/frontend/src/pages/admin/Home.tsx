import { Container } from "@mui/material";
import ViewPosts from "./ViewPosts";
import SideBar from "../../components/sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
      {/* <UserList/> */}
      <ViewPosts />
      <SideBar />
    </Container>
  );
};

export default Home;
