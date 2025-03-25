import SideBar from './components/sidebar'
import UserProfileCard from './components/UserProfileCard'
import { Container } from "@mui/material"
import { UserProvider } from './context/UserContext'
import UserList from './pages/admin/view-all-users'

export default function App() {
  return (
    <>
    <UserProvider>
      <Container>      
        <UserList/>
        <SideBar/>  
      </Container>
    </UserProvider>
    </>
  )
}

