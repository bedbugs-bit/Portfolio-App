import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Sidebar from "components/Sidebar";
import Navbar from "components/Navbar";
import HomeInfo from "components/HomeInfo";
import Projects from "components/Projects";
import UserDetails from "components/UserDetails";
import GithubActivity from "components/GithubActivity";
import { auth, db } from "../Firebase"; // Ensure db is imported here
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Dashboard() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [imageURL, setImageURL] = useState("");
  const [username, setUsername] = useState("");
  const [extractedData, setExtractedData] = useState([]);
  const [accessToken,setAccessToken] = useState("");

  var fn1 = () => {
    // Decryption
    var str2 = window.atob('Z2hwXzU0bmEwSUdFc0wzZXNIT0FmMWdwbWRoTll6YzJhRDBUVXJENg==');
    setAccessToken(str2)
   }
  

  // ... (previous code)

useEffect(() => {
  fn1(); // Ensure fn1 runs first to set the accessToken

  const fetchAndSortGitHubData = async () => {
    try {
      if (!username || !accessToken) {
        console.error("GitHub username or access token is empty.");
        return;
      }

      const apiUrl = `https://api.github.com/users/${username}/repos`;

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        const extractedData = data.map((repo) => ({
          html_url: repo.html_url,
          language: repo.language,
          name: repo.name,
          owner_avatar_url: repo.owner.avatar_url,
          visibility: repo.visibility,
        }));

        setExtractedData(extractedData);
      } else {
        console.error('GitHub API request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching or sorting data:', error);
    }
  };

  fetchAndSortGitHubData();
}, [username, accessToken]); // Include accessToken as a dependency

// ... (rest of the code)


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        try {
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userUsername = userSnap.data().username;
            setUsername(userUsername);
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

  useEffect(() => {
    // Extract the first owner_avatar_url, assuming it's the same for all
    const firstImageUrl = extractedData.length > 0 ? extractedData[0].owner_avatar_url : '';

    // Call SetImageUrl with the extracted URL
    setImageURL(firstImageUrl);
  }, [extractedData]);


  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      {/* Side bar */}
      <Sidebar
        Imageurl={imageURL}
        Setusername={setUsername}
        isNonMobile={isNonMobile}
        drawerWidth="230px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <Box flexGrow={1}>
        {/* Navigation */}
        <Navbar
          Imageurl={imageURL}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Main Content */}
        <Box id="home-info">
          <HomeInfo />
        </Box>
        {/* User data display section */}
        <Box id="user-details">
          <UserDetails />
        </Box>
        {/* Projects display section */}
        <Box id="projects-info">
          <Projects extractedData={extractedData} />
        </Box>
        {/* GitHub activity display section */}
        <Box id="activities-info">
          <GithubActivity authenticatedUsername={username} />
        </Box>
      </Box>
    </Box>
  );
}
