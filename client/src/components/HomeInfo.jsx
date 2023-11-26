import React from "react";
import {
  Box,
  Card,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import userLogo from "assets/home-profile.jpg";

export default function HomeInfo() {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 1300px)");
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const userData = {
    name: "Austin Grey",
    skills: ["JavaScript", "React", "Node.js"],
    bio: "I have been a software engineer for 10 years. I love to code and learn new technologies.",
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: theme.palette.primary.main,
        alignItems: "center",
        justifyContent: "center",
        height: "95vh",
        flexDirection: isNonMobile ? "row" : "column",
        margin: isNonMobile ? "50px" : "10px",
      }}
    >
      <Card
        sx={{
          width: isNonMobile ? "40%" : "80%",
          backgroundColor: theme.palette.background.default,
          borderRadius: "20px",
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "center",
            p: isNonMobile ? 10 : isTablet ? 5 : 2,
          }}
        >
          <Typography
            sx={{
              fontSize: isNonMobile ? "3.2rem" : isTablet ? "2rem" : "1.5rem",
              fontFamily: theme.typography.h2.fontFamily,
            }}
            component="div"
            gutterBottom
            align="center"
          >
            Hi I am {userData.name}, and I am a software engineer.
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            align="center"
            sx={{
              fontSize: isNonMobile ? "1rem" : "1rem",
              fontFamily: theme.typography.h2.fontFamily,
            }}
          >
            {userData.bio}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: isNonMobile ? "row" : "column",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
            }}
          >
            {userData.skills.map((skill) => (
              <Button
                key={skill}
                variant="contained"
                sx={{
                  m: 1,
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.main,
                    opacity: 0.3,
                  },
                }}
              >
                <Typography>{skill}</Typography>
              </Button>
            ))}
          </Box>
        </Box>
      </Card>

      <img
        src={userLogo}
        width={isNonMobile ? "400px" : "400px"}
        height={isNonMobile ? "400px" : "400px"}
        style={{ borderRadius: "80px 30px" }}
        alt="logo"
      ></img>
    </Box>
  );
}
