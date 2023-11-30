import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";

function Project({ id, name, category, description, rating, reviews }) {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.primary.main,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14, fontStyle: "italic" }}
          color={theme.palette.secondary.main}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography
          variant="h4"
          component="div"
          sx={{ color: theme.palette.secondary.main }}
        >
          {name}
        </Typography>

        <Rating value={rating} readOnly />

        <Typography
          variant="body2"
          sx={{ color: theme.palette.secondary.main }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Typography sx={{ color: theme.palette.secondary.main }}>
            See More
          </Typography>
        </Button>
      </CardActions>

      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{ color: theme.palette.secondary.main }}
      >
        <CardContent>
          <Typography>id: {id}</Typography>
          <Typography>More Info </Typography>
          <Typography>More Info </Typography>
          <Typography>More Info </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

{/*export default function Projects() {
  const data = [
    {
      id: 1,
      name: "Project 1",
      category: "Category 1",
      description: "This is a description of Project 1",
      rating: 4.5,
      reviews: 10,
    },
    {
      id: 2,
      category: "Category 2",
      name: "Project 2",
      description: "This is a description of Project 2",
      rating: 4.5,
      reviews: 10,
    },
    {
      id: 3,
      category: "Category 3",
      name: "Project 3",
      description: "This is a description of Project 3",
      rating: 4.5,
      reviews: 10,
    },
    {
      id: 4,
      category: "Category 4",
      name: "Project 4",
      description: "This is a description of Project 4",
      rating: 4.5,
      reviews: 10,
    },
    {
      id: 5,
      category: "Category 5",
      name: "Project 5",
      description: "This is a description of Project 5",
      rating: 4.5,
      reviews: 10,
    },
    {
      id: 6,
      category: "Category 6",
      name: "Project 6",
      description: "This is a description of Project 6",
      rating: 4.5,
      reviews: 10,
    },
    {
      id: 7,
      category: "Category 7",
      name: "Project 7",
      description: "This is a description of Project 7",
      rating: 4.5,
      reviews: 10,
    },
    {
      id: 8,
      category: "Category 8",
      name: "Project 8",
      description: "This is a description of Project 8",
      rating: 4.5,
      reviews: 10,
    },
    {
      id: 9,
      category: "Category 9",
      name: "Project 9",
      description: "This is a description of Project 9",
      rating: 4.5,
      reviews: 10,
    },
    {
      id: 10,
      category: "Category 10",
      name: "Project 10",
      description: "This is a description of Project 10",
      rating: 4.5,
      reviews: 10,
    },

    {
      id: 11,
      category: "Category 11",
      name: "Project 11",
      description: "This is a description of Project 11",
      rating: 4.5,
      reviews: 10,
    },

    {
      id: 12,
      category: "Category 12",
      name: "Project 12",
      description: "This is a description of Project 12",
      rating: 1,
      reviews: 10,
    },
  ];

  // Temporary loading state logic. Need to implement loading state
  const isLoading = false;
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m="1.5rem 2.3rem">
      <Header title="PROJECTS" subtitle="View your feed of Github Activity" />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map((props) => (
            <Project key={props.id} {...props} />
          ))}
        </Box>
      ) : (
        <>Loading your data ☕...</>
      )}
    </Box>
  );
}*/}

export default function Projects({extractedData}){
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return(
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%" bgcolor= {theme.palette.background.default}>
    {/* Sidebar and other components ... */}

    <Box color={theme.palette.secondary.main} display="grid" gridTemplateColumns="auto auto auto" gap={5} p={2}>
      {extractedData.map((repo, index) => (
        <div key={index} style={{
          backgroundColor: theme.palette.primary.main,
          borderRadius: '15px',
          padding: '15px',
          textAlign: 'center',
        }}>
          <p>{repo.name}</p>
          <p>Language: {repo.language}</p>
          <p>{repo.visibility}</p>
          <p>HTML URL: <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.html_url}</a></p>
        </div>
      ))}
    </Box>
  </Box>
  )
}