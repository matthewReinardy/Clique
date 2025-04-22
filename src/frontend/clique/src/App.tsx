import { Container } from "@mui/material"
import { UserProvider } from "./context/UserContext"
import { ToastContainer } from "react-toastify"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Feed from "./pages/Feed"
import UserListPage from "./pages/UserListPage"
import Notifications from "./pages/Notifications"
import Profile from "./pages/Profile"
import LoginPage from "./pages/Login"

export default function App() {
  const role = localStorage.getItem("role")
  const isAdmin = role === "admin"
  const isUserOrBusiness = role === "user" || role === "business"

  return (
    <UserProvider>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {isAdmin && (
            <>
              <Route path="/" element={<UserListPage />} />
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
                path="/notifications"
                element={
                  <Container>
                    <Notifications />
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
          {!role && <Route path="*" element={<Navigate to="/login" />} />}
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

