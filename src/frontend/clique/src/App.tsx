import SideBar from './components/sidebar'
import UserProfileCard from './components/UserProfileCard'
import { Container } from "@mui/material"
import { UserProvider } from './context/UserContext'

export default function App() {
  return (
    <>
    <UserProvider>
      <Container>
        <UserProfileCard />
        <SideBar/>  
      </Container>
    </UserProvider>
    </>
  )
}

