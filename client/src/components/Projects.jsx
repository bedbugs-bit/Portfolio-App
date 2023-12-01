import React from "react";
import {
  Button,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";




export default function Projects({ extractedData }) {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleLearnMore = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Box
      display={isNonMobile ? "flex" : "block"}
      width="100%"
      height="100%"
      bgcolor={theme.palette.background.default}
    >
      {/* Sidebar and other components ... */}

      <Box
        color={theme.palette.secondary.main}
        display="grid"
        gridTemplateColumns="auto auto auto"
        gap={5}
        p={2}
        fontFamily="Rubik, sans-serif"
      >
        {extractedData.map((repo, index) => (
          <div key={index} style={{
            backgroundColor: theme.palette.primary.main,
            borderRadius: '15px',
            padding: '15px',
            textAlign: 'center',
          }}>
            <p style={{ fontWeight: 800, fontSize: "1.2rem" }}>{repo.name}</p>
            <p style={{ fontWeight: 400, fontSize: "1.2rem" }}>{repo.language}</p>
            <p>{repo.visibility}</p>
            <Box>
              <p>HTML URL: <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.html_url}</a></p>
              <Button variant="outlined" color="secondary" onClick={() => handleLearnMore(repo.html_url)}>
                Learn More
              </Button>
            </Box>
          </div>
        ))}
      </Box>
    </Box>
  );
}
