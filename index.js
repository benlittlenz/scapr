import express from "express";
import { getTwitterCount, getInstaCount } from "./scraper";
import db from "./utils/db";

const app = express();

console.log(db);

app.get("/scrape", async (req, res, next) => {
  console.log("scraping");
  const [instaCount, twitterCount] = await Promise.all([
    getInstaCount(),
    getTwitterCount(),
  ]);
  console.log(instaCount, twitterCount);
  db.get("twitter")
    .push({
      date: Date.now(),
      count: twitterCount,
    })
    .write();
  db.get("insta")
    .push({
      date: Date.now(),
      count: instaCount,
    })
    .write();
  res.json({ instaCount, twitterCount });
});

app.listen(3000, () => console.log("app running"));
