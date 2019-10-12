import axios from "axios";
import superagent from "superagent";
import cheerio from "cheerio";

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
