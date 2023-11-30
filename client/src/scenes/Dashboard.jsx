import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";


import Sidebar from "components/Sidebar";
import Navbar from "components/Navbar";
import HomeInfo from "components/HomeInfo";
import Projects from "components/Projects";
import UserDetails from "components/UserDetails";

export default function Dashboard() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // temporary userId for testing. Will be removed later.
  // const userID
  // const data

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      {/* Side bar */}
      <Sidebar
        // user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="230px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <Box flexGrow={1}>
        {/* Navigation */}
        <Navbar
          // user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Main Content */}
        <Box id="home-info">
          <HomeInfo />
        </Box>
        {/* User data display section */}
        <Box id="projects-info">
          <UserDetails />
        </Box>
        {/* User data display section */}

        <Box id="projects-info">
          <Projects />
        </Box>
      </Box>
    </Box>
  );
}
