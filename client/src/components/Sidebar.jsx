import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  HomeOutlined,
} from "@mui/icons-material";

import FlexBetween from "./FlexBetween";
import profilePhoto from "assets/profile.jpg";
import logoPhoto from "assets/github.svg";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

import { auth, db } from "../Firebase"; // Ensure db is imported here
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Sidebar({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) {
  const theme = useTheme();
  const [firstName, setFirstName] = useState(""); // State to hold the user's first name

  const navItems = [
    {
      text: "Home",
      icon: <HomeOutlined />,
      link: "#home-info",
    },

    {
      text: "Projects",
      icon: <WorkOutlineOutlinedIcon />,
      link: "#projects-info",
    },

    {
      text: "Github Activity",
      icon: <HistoryOutlinedIcon />,
    },

    {
      text: "Add Project",
      icon: <AddBoxOutlinedIcon />,
    },
  ];

 useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, async (user) => {
     if (user) {
       const userRef = doc(db, "users", user.uid);
       try {
         const userSnap = await getDoc(userRef);
         if (userSnap.exists()) {
           setFirstName(userSnap.data().firstName); // Set the first name
         } else {
           console.log("No such document!");
         }
       } catch (error) {
         console.error("Error fetching user data:", error);
       }
     }
   });

   return () => unsubscribe(); // Unsubscribe on cleanup
 }, []);
  // ... rest of the component

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary.main,
              backgroundColor: theme.palette.primary.main,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "10px",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              marginLeft: "0.5rem",
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" gap="0.5rem" justifyContent="center">
                  <img
                    src={logoPhoto}
                    alt="Logo"
                    style={{ width: "50px", height: "50px" }}
                  />{" "}
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    alignItems="center"
                  >
                    GitHub Pro
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft sx={{ color: theme.palette.secondary.main }} />
                  </IconButton>
                )}
              </FlexBetween>
              <Divider
                sx={{
                  my: 2,
                  height: "2px",
                  backgroundColor: theme.palette.secondary.main,
                  boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.25)",
                  width: "100%",
                }}
              />
            </Box>
            <List>
              {navItems.map(({ text, icon, link }) => {
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      component="a"
                      href={link}
                      // onClick={() => {
                      //   setIsSidebarOpen(false);
                      // }}
                      sx={{
                        "&:hover": {
                          backgroundColor:
                            theme.palette.mode === "light"
                              ? "rgba(255, 255, 255, 0.1)"
                              : "rgba(0, 0, 0, 0.3)",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "1rem",
                          color: theme.palette.secondary.main,
                        }}
                      >
                        {React.cloneElement(icon, {
                          style: { fontSize: "1.5rem" },
                        })}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            sx={{
                              color: theme.palette.secondary.main,
                              fontSize: "1.2rem",
                            }}
                          >
                            {text}
                          </Typography>
                        }
                      />

                      <a href={link}> </a>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          {/* Profile image and name */}
          <Box position="absolute" bottom="2rem">
            <FlexBetween
              textTransform="none"
              gap="1rem"
              m="1.5rem 2rem 0 1.5rem"
            >
              <Box
                component="img"
                alt="profile"
                src={profilePhoto}
                height="40px"
                width="40px"
                borderRadius="70%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {firstName}{" "}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary.main }}
                >
                  Student
                </Typography>
              </Box>
              <IconButton>
                <SettingsOutlined
                  sx={{
                    color: theme.palette.secondary.main,
                    fontSize: "25px ",
                    marginLeft: "0.7rem",
                  }}
                />
              </IconButton>
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
}
