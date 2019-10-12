import axios from "axios";
import superagent from "superagent";
import cheerio from "cheerio";
import db from "./utils/db";
import "./utils/cron";

export async function getHTML(url) {
  const { data: html } = await axios.get(url);
  //console.log(html)
  return html;
}

export async function getFollowers(html) {
  const $ = cheerio.load(html);
  //console.log($)
  const span = $('[data-nav="followers"] .ProfileNav-value');
  return span.data("count");
}

export async function getInstFollowers(html) {
  const $ = cheerio.load(html);
  const data = $('script[type="application/ld+json"]').html();
  const obj = JSON.parse(data);
  //   console.log(parseInt(obj.mainEntityofPage.interactionStatistic.userInteractionCount))

  return parseInt(
    obj.mainEntityofPage.interactionStatistic.userInteractionCount,
  );
}

export async function getTwitterCount() {
  const html = await getHTML("https://twitter.com/wesbos");
  return await getFollowers(html);
}

export async function getInstaCount() {
  const html = await getHTML("https://instagram.com/wesbos");
  return await getInstFollowers(html);
}

export async function runCron() {
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
  console.log("done");
}
