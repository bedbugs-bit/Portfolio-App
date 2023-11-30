import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import userLogo from "assets/home-profile.jpg"; // Make sure the path is correct
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../Firebase";

export default function HomeInfo() {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:1300px)");
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [userData, setUserData] = useState({
    name: "Guest",
    skills: [],
    bio: "Loading...",
    workExperience: [],
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        try {
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const data = userSnap.data();
            setUserData({
              name: `${data.firstName} ${data.lastName}`, // Concatenate first name and last name
              skills: data.skills ? data.skills.split(", ") : [],
              bio: data.bio || "Welcome to my profile!",
              workExperience: data.workExperience
                ? data.workExperience.split(", ")
                : [],
              // ... you can spread other data fields if needed
            });
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserData({
            name: "Guest",
            skills: [],
            bio: "An error occurred.",
            workExperience: [],
          });
        }
      } else {
        setUserData({
          name: "Guest",
          skills: [],
          bio: "No user is signed in.",
          workExperience: [],
        });
      }
    });

    return () => unsubscribe();
  }, []);

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
            {userData.skills.map((skill, index) => (
              <Button
                key={index}
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
        alt="profile"
      />
    </Box>
  );
}
