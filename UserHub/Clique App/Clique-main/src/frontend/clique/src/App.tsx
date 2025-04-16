import './App.css'
import SideBar from './components/sidebar'
import { Container, Typography } from "@mui/material";

function App() {
  return (
    <>
    <Container>

      <SideBar/>
      {/* Below is an example strcture - Lily */}
      <Typography 
        variant='h1' 
        sx={{}}>
        Clique
      </Typography>

    </Container>
    </>
  )
}

export default App
