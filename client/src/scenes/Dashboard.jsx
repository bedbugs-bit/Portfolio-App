import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";


import Sidebar from "components/Sidebar";
import Navbar from "components/Navbar";
import HomeInfo from "components/HomeInfo";
import Projects from "components/Projects";


import GithubActivity from "components/GithubActivity";

export default function Dashboard() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [Imageurl,SetImageUrl] = useState("");
  // temporary userId for testing. Will be removed later.
  // const userID
  // const data

  const [extractedData, setExtractedData] = useState([]);

  const accessToken = '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';
  const authenticatedUsername = 'Samkiroko';

  async function fetchAndSortGitHubData() {
    try {
      const apiUrl = `https://api.github.com/users/${authenticatedUsername}/repos`;

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        const extractedData = data.map(repo => ({
          html_url: repo.html_url,
          language: repo.language,
          name: repo.name,
          owner_avatar_url: repo.owner.avatar_url,
          visibility: repo.visibility,
        }));

        console.log('Extracted data:', extractedData);

        setExtractedData(extractedData);
        

        // ... Rest of the code remains the same ...
      } else {
        console.error('GitHub API request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching or sorting data:', error);
    }
  }

useEffect(() => {
  fetchAndSortGitHubData();
}, []); // Empty dependency array to ensure it runs only once on component mount

useEffect(() => {
  // Extract the first owner_avatar_url, assuming it's the same for all
  const firstImageUrl = extractedData.length > 0 ? extractedData[0].owner_avatar_url : '';

  // Call SetImageUrl with the extracted URL
  SetImageUrl(firstImageUrl);
}, [extractedData, SetImageUrl]); // Include SetImageUrl in the dependency array

// ...

console.log(Imageurl)


  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      {/* Side bar */}
      <Sidebar
      Imageurl={Imageurl}
        // user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="230px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <Box flexGrow={1}>
        {/* Navigation */}
        <Navbar
        Imageurl={Imageurl}
          // user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Main Content */}
        <Box id="home-info">
          <HomeInfo />
        </Box>
        <Box id="projects-info">
          <Projects extractedData={extractedData}/>
        </Box>
        <Box id="Activites-info">
          <GithubActivity authenticatedUsername={authenticatedUsername}/>
        </Box>
      </Box>
    </Box>
  );
}
