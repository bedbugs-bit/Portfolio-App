import React, { useState, useEffect } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { auth, db } from "../Firebase"; // Ensure db is imported here
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth"; // firebase signout
import { useNavigate } from "react-router-dom";

export default function Navbar({ isSidebarOpen, setIsSidebarOpen, Imageurl }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate(); // useNavigate hook called here
  const [anchorEl, setAnchorEl] = useState(null);
  const [firstName, setFirstName] = useState(""); // State to hold the user's first name

  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

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

  // Function to logout the current user
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out: ", error.message);
    }
  };

  return (
    <Box>
      {/* Navbar */}
      <AppBar
        sx={{
          position: "static",
          background: "none",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Left Side of the Navbar */}
          <FlexBetween>
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <MenuIcon />
            </IconButton>
          </FlexBetween>

          {/* Right Side of the Navbar */}
          <FlexBetween gap="1.5rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <ColorLensOutlinedIcon sx={{ fontSize: "25px" }} />
              ) : (
                <ColorLensIcon sx={{ fontSize: "25px" }} />
              )}
            </IconButton>
            <IconButton>
              <SettingsOutlined sx={{ fontSize: "25px" }} />
            </IconButton>

            <FlexBetween>
              <Button
                onClick={handleClick}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textTransform: "none",
                  gap: "1rem",
                }}
              >
                <Box
                  component="img"
                  alt="profile"
                  src={Imageurl}
                  height="32px"
                  width="32px"
                  borderRadius="70%"
                  sx={{ objectFit: "cover" }}
                />
                <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.85rem"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    {firstName}{" "}
                    {/* Display the user's first name dynamically */}
                  </Typography>
                  <Typography
                    fontSize="0.75rem"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    Student
                  </Typography>
                </Box>
                <ArrowDropDownOutlined
                  sx={{ color: theme.palette.primary.main, fontSize: "25px" }}
                />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </Menu>
            </FlexBetween>
          </FlexBetween>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
