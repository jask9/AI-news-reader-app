import alanBtn from "@alan-ai/alan-sdk-web";
import { useEffect, useState } from "react";
import NewsCards from "./components/NewsCards/NewsCards";
import { Typography } from "@mui/material";
import classes from "./App.module.css";
import wordsToNumbers from "words-to-numbers";

function App() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);

  useEffect(() => {
    // initiating alan button
    const alanInstance = alanBtn({
      key: process.env.REACT_APP_ALAN_API_KEY,
      onCommand: ({ command, articles, number }) => {
        switch (command) {
          case "newHeadlines":
            console.log(articles);
            setNewsArticles(articles);
            setActiveArticle(-1);
            break;
          case "highlight":
            setActiveArticle((prevActive) => prevActive + 1);
            break;
          case "open":
            // for use cases where it understands 2 as "to", or 4 as "for"
            const parsedNumber =
              number.length > 2
                ? wordsToNumbers(number, { fuzzy: true })
                : number;
            const article = articles[parsedNumber - 1];
            if (parsedNumber > articles.length) {
              alanInstance.playText("Please try that again...");
            } else if (article) {
              window.open(article.url, "_blank");
              alanInstance.playText("Opening...");
            } else {
              alanInstance.playText("Please try that again...");
            }
            break;
          default:
            break;
        }
      },
    });

    // cleanup function to remove the event listener when the component unmounts
    return () => {
      alanInstance.remove();
    };
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}>
              <Typography variant="h5" component="h2">
                Try saying: <br />
                <br />
                Open article number [4]
              </Typography>
            </div>
            <div className={classes.card}>
              <Typography variant="h5" component="h2">
                Try saying: <br />
                <br />
                Go back
              </Typography>
            </div>
          </div>
        ) : null}
        <img
          className={classes.alanLogo}
          src="https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg"
          alt="alan-logo"
        />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
