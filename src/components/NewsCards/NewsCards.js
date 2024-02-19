import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import { Grid, Grow, Typography } from "@mui/material";

const infoCards = [
  { color: "#00838f", title: "Latest News", text: "Give me the latest news" },
  {
    color: "#1565c0",
    title: "News by Categories",
    info: "Business, Entertainment, General, Health, Science, Sports, Technology",
    text: "Give me the latest Technology news",
  },
  {
    color: "#4527a0",
    title: "News by Terms",
    info: "Bitcoin, PlayStation 5, Smartphones, Donald Trump...",
    text: "What's up with PlayStation 5",
  },
  {
    color: "#283593",
    title: "News by Sources",
    info: "CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...",
    text: "Give me the news from CNN",
  },
];

function NewsCards({ articles, activeArticle }) {
  if (!articles.length) {
    return (
      <Grow in>
        <Grid
          sx={{
            padding: "0 5%",
            width: "100%",
            margin: 0,
          }}
          container
          alignItems="stretch"
          spacing={3}
        >
          {infoCards.map((infoCard, i) => (
            <Grid
              key={i}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: infoCard.color,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  padding: "10%",
                  borderRadius: 10,
                  color: "white",
                }}
              >
                <Typography variant="h5" component="h5">
                  {infoCard.title}
                </Typography>
                {infoCard.info ? (
                  <Typography variant="h6" component="h6">
                    <strong>{infoCard.title.split(" ")[2]}</strong>: <br />
                    {infoCard.info}
                  </Typography>
                ) : null}
                <Typography variant="h6" component="h6">
                  Try saying: <br /> <i>{infoCard.text}</i>
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grow>
    );
  }

  return (
    <Grow in>
      <Grid
        sx={{
          padding: "0 5%",
          width: "100%",
          margin: 0,
        }}
        container
        alignItems="stretch"
        spacing={3}
      >
        {articles.map((article, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: "flex" }}>
            {/* a grid has 12 spaces in total */}
            {/* xs=12 means 1 card on very xs screen, sm=6 means 2 cards on small screen */}
            <NewsCard activeArticle={activeArticle} article={article} i={i} />
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
}

export default NewsCards;
