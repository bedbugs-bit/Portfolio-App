import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  useTheme,
  CircularProgress,
} from "@mui/material";
import Header from "components/Header";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase"; // Ensure this is the correct path to your Firebase configuration

export default function UserDetails() {
  const theme = useTheme();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        getDoc(userRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              setUserData(docSnap.data()); // Store the user data in state
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          })
          .finally(() => {
            setIsLoading(false); // Hide loading indicator
          });
      } else {
        // User is not logged in or session has expired
        setIsLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Helper function to render user data card
  const renderUserDetailCard = (title, data) => (
    <Card sx={{ mb: 2, backgroundColor: theme.palette.primary.main }}>
      <CardContent>
        <Typography variant="h5" sx={{ color: theme.palette.secondary.main }}>
          {title}
        </Typography>
        <Typography sx={{ color: theme.palette.secondary.main }}>
          {data || "Not available"}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box m="1.5rem 2.3rem">
      <Header
        title="USER DETAILS"
        subtitle="View your details including work experience, education, and contact information"
      />
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {renderUserDetailCard("Work Experience", userData.workExperience)}
          {renderUserDetailCard("Education", userData.education)}
          {renderUserDetailCard("Contact Information", userData.contact)}
        </>
      )}
    </Box>
  );
}
