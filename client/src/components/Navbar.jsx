import React, { useState } from "react";
import { Box } from "@mui/material";
import {
  Menu as MenuIcon,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import profilePhoto from "assets/profile.jpg";
import {
  useTheme,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import ColorLensIcon from "@mui/icons-material/ColorLens";

export default function Navbar({ isSidebarOpen, setIsSidebarOpen }) {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

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
            <IconButton
              onClick={() => {
                console.log("open/close sidebar");
                setIsSidebarOpen(!isSidebarOpen);
              }}
            >
              <MenuIcon />
            </IconButton>
            {/* <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          backgroundColor={theme.palette.primary.alt}
          borderRadius="10px"
          gap="3rem"
          p="0.1rem 1.5rem"
        ></Box> */}
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
                  src={profilePhoto}
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
                    {/* user display name */}
                    Austin
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
                <MenuItem onClick={handleClose}>Log Out</MenuItem>
              </Menu>
            </FlexBetween>
          </FlexBetween>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
