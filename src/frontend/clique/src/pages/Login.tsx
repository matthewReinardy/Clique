import { Container } from "@mui/material"
import { loginAsRole } from "../api/authApi"
import { Button } from '@mui/material'

const Login = () => {

  const handleLogin = async (role: 'user' | 'business' | 'admin') => {
    try {
      const response = await loginAsRole(role)

      if (response.success && response.data) {
        
        const { id, accountType: role, username } = response.data

        localStorage.setItem('userId', id.toString())
        localStorage.setItem('role', role)
        localStorage.setItem('username', username)

        window.location.reload()
      } else {
        throw new Error(response.message || "Login failed.")
      }
    } catch (error) {
      console.error("Login failed:", error)
      alert("failed to login.")
    }
  }

  return (
    <Container>
      <div>
        <h1>Select Your Role</h1>
        <Button
          variant="contained"
          onClick={() => handleLogin("user")}
        >
          User
        </Button>
        <Button
          variant="contained"
          onClick={() => handleLogin("business")}
        >
          Business
        </Button>
        <Button
          variant="contained"
          onClick={() => handleLogin("admin")}
        >
          Admin
        </Button>
      </div>
    </Container>
  )
}

export default Login;
