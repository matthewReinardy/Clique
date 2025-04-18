import { Container } from "@mui/material";
import { UserProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Feed from "./pages/Feed";
import UserListPage from "./pages/UserListPage";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import MyFeed from "./pages/MyFeed";
import "./app.css";

export default function App() {
  return (
    <>
      <UserProvider>
        <ToastContainer />
        <Container>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/myFeed" element={<MyFeed />} />
              <Route path="/userlist" element={<UserListPage />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </UserProvider>
    </>
  );
}
