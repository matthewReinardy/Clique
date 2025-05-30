import { Container } from "@mui/material";
import { UserProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Feed from "./pages/Feed";
import UserListPage from "./pages/UserListPage";
import Profile from "./pages/Profile";
import MyFeed from "./pages/MyFeed";
import "./app.css";
import LoginPage from "./pages/Login";
import { role, isAdmin, isUserOrBusiness } from "./session/userRole";

export default function App() {
  return (
    <UserProvider>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {/* If there's no role, show the login page */}
          {!role && <Route path="/login" element={<LoginPage />} />}

          {isAdmin && (
            <>
              <Route
                path="/"
                element={
                  <Container>
                    <UserListPage />
                  </Container>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}

          {isUserOrBusiness && (
            <>
              <Route
                path="/"
                element={
                  <Container>
                    <Feed />
                  </Container>
                }
              />
              <Route
                path="/myFeed"
                element={
                  <Container>
                    <MyFeed />
                  </Container>
                }
              />
              <Route
                path="/profile"
                element={
                  <Container>
                    <Profile />
                  </Container>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}

          {/* Redirect to login if no role is found */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
