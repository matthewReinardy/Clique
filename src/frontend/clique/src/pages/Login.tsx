import { loginAsRole } from "../api/authApi"
import { useNavigate } from "react-router-dom"
import { Button } from '@mui/material'


const Login = () => {
  const navigate = useNavigate()

  const handleLogin = async (role: 'user' | 'business' | 'admin') => {
    try {
      const response = await loginAsRole(role)

      if (response.success && response.data) {
        
        const { id, accountType: role, username } = response.data

        localStorage.setItem('userId', id.toString())
        localStorage.setItem('role', role)
        localStorage.setItem('username', username)

        navigate(`/${role}-dashboard`)
      } else {
        throw new Error(response.message || "Login failed.")
      }
    } catch (error) {
      console.error("Login failed:", error)
      alert("failed to login.")
    }
  }

  return (
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
  )

}

export default Login;
