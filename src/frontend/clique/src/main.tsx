import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  //How custom colors can be accessed:
  interface Palette {
    customColors: {
      zomp: string;
      champagne: string;
      buff: string;
      sienna: string;
      blackBean: string;
    };
  }
  //How custom colors can be set (using createTheme()):
  interface PaletteOptions {
    customColors?: {
      zomp?: string;
      champagne?: string;
      buff?: string;
      sienna?: string;
      blackBean?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    customColors: {
      zomp: "#38AF93",
      champagne: "#F2E0D5",
      buff: "#E6A57E",
      sienna: "#8C2703",
      blackBean: "#401201",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#38AF93", // default background
          color: "#fff", // text color
          "&:hover": {
            backgroundColor: "#38AF93",
          },
        },
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
