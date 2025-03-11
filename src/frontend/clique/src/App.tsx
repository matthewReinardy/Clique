import SideBar from './components/sidebar'
import UserProfileCard from './components/UserProfileCard'
import { Container, Typography } from "@mui/material"
import { UserProvider } from './context/UserContext'

export default function App() {
  return (
    <>
    <UserProvider>
      <Container>

        <UserProfileCard />

        {/* <SideBar/>  */} 
        {/* Below is an example strcture - Lily */}
        {/* <Typography 
          variant='h1' 
          sx={{}}>
          Clique
        </Typography> */}

      </Container>
    </UserProvider>
    </>
  )
}

