import React, { useState, useEffect, useMemo } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";

export default function GithubActivity({ authenticatedUsername }) {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Function to remove hash from color values
  const removeHashFromColor = (color) => color.replace(/^#/, "");

  const strippedTheme = useMemo(
    () => ({
      background: removeHashFromColor(theme.palette.background.default),
      neutral: removeHashFromColor(theme.palette.neutral.main),
      primary: removeHashFromColor(theme.palette.primary.main),
    }),
    [theme]
  );

  const [githubActivitiesUrl, setGithubActivitiesUrl] = useState("");
  const [githubReadmeStatsUrl, setGithubReadmeStatsUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [usernameLoaded, setUsernameLoaded] = useState(false);

  useEffect(() => {
    if (authenticatedUsername) {
      setIsLoading(false);
      setUsernameLoaded(true);

      const generateGithubActivitiesUrl = () => {
        return `https://github-readme-streak-stats.herokuapp.com/?user=${authenticatedUsername}&stroke=${strippedTheme.neutral}&background=${strippedTheme.background}&ring=${strippedTheme.primary}&fire=${strippedTheme.primary}&currStreakNum=${strippedTheme.neutral}&currStreakLabel=${strippedTheme.primary}&sideNums=${strippedTheme.neutral}&sideLabels=${strippedTheme.neutral}&dates=${strippedTheme.neutral}&hide_border=true`;
      };
      const generateGithubReadmeStatsUrl = () => {
        return `https://github-readme-stats.vercel.app/api?username=${authenticatedUsername}&show_icons=true&hide=stars,contribs&count_private=true&title_color=${strippedTheme.primary}&text_color=${strippedTheme.neutral}&icon_color=${strippedTheme.primary}&bg_color=${strippedTheme.background}&hide_border=true&show_icons=true`;
      };
      setGithubReadmeStatsUrl(generateGithubReadmeStatsUrl());
      setGithubActivitiesUrl(generateGithubActivitiesUrl());
    }
  }, [authenticatedUsername, strippedTheme]);

  if (isLoading || !usernameLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      alignContent="center"
      display={isNonMobile ? "flex" : "block"}
      justifyContent="space-around"
      width="100%"
      height="100%"
      bgcolor={theme.palette.background.default}
    >
      <img
        src={githubActivitiesUrl}
        alt="GitHub Activities"
        style={{
          width: "40%",
          height: "auto",
          border: `2px solid ${strippedTheme.primary}`,
          borderRadius: "8px",
          marginBottom: "16px",
        }}
      />

      <img
        src={githubReadmeStatsUrl}
        alt="GitHub Readme Stats"
        style={{
          width: "40%",
          height: "auto",
          border: `2px solid ${strippedTheme.primary}`,
          borderRadius: "8px",
        }}
      />
    </Box>
  );
}
