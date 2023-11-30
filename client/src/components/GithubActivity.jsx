import React, { useState, useEffect } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";

export default function GithubActivity({authenticatedUsername}) {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Function to remove hash from color values
  const removeHashFromColor = (color) => color.replace(/^#/, '');
  const strippedTheme = {
    background: removeHashFromColor(theme.palette.background.default),
    neutral: removeHashFromColor(theme.palette.neutral.main),
    primary: removeHashFromColor(theme.palette.primary.main),
  };

  const generateGithubActivitiesUrl = () => {
    

    return `https://github-readme-streak-stats.herokuapp.com/?user=${authenticatedUsername}&stroke=${strippedTheme.neutral}&background=${strippedTheme.background}&ring=${strippedTheme.primary}&fire=${strippedTheme.primary}&currStreakNum=${strippedTheme.neutral}&currStreakLabel=${strippedTheme.primary}&sideNums=${strippedTheme.neutral}&sideLabels=${strippedTheme.neutral}&dates=${strippedTheme.neutral}&hide_border=true`;
  };

  const [githubActivitiesUrl, setGithubActivitiesUrl] = useState(generateGithubActivitiesUrl);

  // GitHub Readme Stats URL
  const githubReadmeStatsUrl = `https://github-readme-stats.vercel.app/api?username=${authenticatedUsername}&show_icons=true&hide=stars,contribs&count_private=true&title_color=${strippedTheme.primary}&text_color=${strippedTheme.neutral}&icon_color=${strippedTheme.primary}&bg_color=${strippedTheme.background}&hide_border=true&show_icons=true`;

  // Update the URLs when the theme changes
  useEffect(() => {
    setGithubActivitiesUrl(generateGithubActivitiesUrl());
  }, [theme]);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%" bgcolor={theme.palette.background.default}>
      {/* Sidebar and other components ... */}
      <img
        src={githubActivitiesUrl}
        alt="GitHub Activities"
        style={{
          border: `2px solid ${strippedTheme.primary}`,
          borderRadius: '8px',
          marginBottom: '16px', // Adjust margin as needed
        }}
      />

      {/* New GitHub Readme Stats URL */}
      <img
        src={githubReadmeStatsUrl}
        alt="GitHub Readme Stats"
        style={{
          border: `2px solid ${strippedTheme.primary}`,
          borderRadius: '8px',
        }}
      />
    </Box>
  );
}
