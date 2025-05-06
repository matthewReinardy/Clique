import { Container } from "@mui/material";
import { loginAsRole } from "../api/authApi";
import { Button } from "@mui/material";
import PageWrapper from "./PageWrapper";
import { Margin } from "@mui/icons-material";
import { toast } from "react-toastify";

const Login = () => {
  const handleLogin = async (role: "user" | "business" | "admin") => {
    try {
      const response = await loginAsRole(role)

      if (response.success && response.data) {
        const { id, accountType: role, username } = response.data

        localStorage.setItem("userId", id.toString())
        localStorage.setItem("role", role)
        localStorage.setItem("username", username)

        window.location.reload();
      } else {
        throw new Error(response.message || "Login failed.")
      }
    } catch (error) {
      toast.error(`Login failed: ${error}`)
    }
  }

  return (
    <PageWrapper hideSideBar>
      <div>
        <h1>Select Your Role</h1>
        <Button
          sx={{ margin: 1 }}
          variant="contained"
          onClick={() => handleLogin("user")}
        >
          User
        </Button>
        <Button
          sx={{ margin: 1 }}
          variant="contained"
          onClick={() => handleLogin("business")}
        >
          Business
        </Button>
        <Button
          sx={{ margin: 1 }}
          variant="contained"
          onClick={() => handleLogin("admin")}
        >
          Admin
        </Button>
      </div>
    </PageWrapper>
  )
}

export default Login;
