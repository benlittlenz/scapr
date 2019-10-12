import express from "express";
import cors from 'cors'
import { getTwitterCount, getInstaCount } from "./scraper";
import db from "./utils/db";

const app = express();
app.use(cors())

console.log(db);

app.get("/scrape", async (req, res, next) => {
  console.log("scraping");
  const [instaCount, twitterCount] = await Promise.all([
    getInstaCount(),
    getTwitterCount(),
  ]);
  console.log(instaCount, twitterCount);
  res.json({ instaCount, twitterCount });
});

app.get('/data', async (req, res, next) => {
  const twitter = db.value()
  res.json(twitter)
})

app.listen(4000, () => console.log("app running"));
