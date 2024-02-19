import React, { useState, useEffect, createRef } from "react";
import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

function NewsCard({
  article: { description, publishedAt, source, title, url, urlToImage },
  i,
  activeArticle,
}) {
  const [elRefs, setElRefs] = useState([]);

  const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

  useEffect(() => {
    // set refs for each news card (total 20)
    const initialRefs = Array(20).fill(); //empty array for the 20 cards

    setElRefs((refs) => initialRefs.map((_, j) => refs[j] || createRef())); //create refs for each card on componentDidMount, i.e first render with cards
  }, []);

  // to autoscroll when AI's reading articles
  useEffect(() => {
    // if there's an active article AND if ref exists for that activeArticle
    if (i === activeArticle && elRefs[activeArticle]) {
      scrollToRef(elRefs[activeArticle]);
    }
  }, [i, activeArticle, elRefs]);

  return (
    <Card
      ref={elRefs[i]}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderLeft:
          activeArticle === i ? "10px solid #22289a" : "0px solid white",
      }}
    >
      <CardActionArea href={url} target="_blank">
        <CardMedia
          sx={{ height: 250 }}
          image={
            urlToImage ||
            "https://cdn.pixabay.com/photo/2015/02/15/09/33/news-636978_960_720.jpg"
          }
        />
        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "20px 0",
            }}
          >
            <Typography variant="body2" color="textSecondary" component="h2">
              {new Date(publishedAt).toDateString()}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="h2">
              {source.name}
            </Typography>
          </div>
          <Typography gutterBottom variant="h5">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          padding: "0 16px 8px 16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button size="small" color="primary">
          Learn More
        </Button>
        <Typography variant="h5" color="textSecondary">
          {i + 1}
        </Typography>
      </CardActions>
    </Card>
  );
}

export default NewsCard;
