import SideBar from './components/sidebar'
import UserProfileCard from './components/UserProfileCard'
import { Container } from "@mui/material"
import { UserProvider } from './context/UserContext'
import UserList from './components/UserList'

export default function App() {
  return (
    <>
    <UserProvider>
      <Container>      
        <UserList/>
      </Container>
    </UserProvider>
    </>
  )
}

