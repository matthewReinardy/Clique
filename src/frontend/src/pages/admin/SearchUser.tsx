import { Container } from "@mui/material";
import SideBar from "../../components/sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SearchUserResults from "../../components/SearchUserResults";

const SearchUser = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const authData = localStorage.getItem("authData");
    if (!authData) {
      navigate("/auth", { replace: true });
    }
  }, [navigate]);
  return (
    <Container>
      <SearchUserResults />
      <SideBar />
    </Container>
  );
};

export default SearchUser;
