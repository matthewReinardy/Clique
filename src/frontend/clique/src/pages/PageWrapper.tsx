import { Box } from "@mui/material";
import SideBar from "../components/sidebar";
import { ReactNode } from "react";

type PageWrapperProps = {
  children: ReactNode;
};

//All pages should be wrapped in the PageWrapper if they want to leverage shared components like sidebar
const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <>
      <SideBar />
      <Box sx={{ paddingLeft: 30 }}>{children}</Box>
    </>
  );
};

export default PageWrapper;
