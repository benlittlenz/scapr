import { getHTML, getFollowers, getInstFollowers } from "./scraper";

async function go() {
  const twitterPromise = await getHTML("https://twitter.com/wesbos");
  const instaPromise = await getHTML("https://instagram.com/wesbos");
  const [instaHTML, twitterHTML] = await Promise.all([
    instaPromise,
    twitterPromise,
  ]);
  const instaCount = await getInstFollowers(instaHTML);
  const twitterCount = await getFollowers(twitterHTML);
  console.log(`insta followers: ${instaCount} twitter followers: ${twitterCount}`)
}

go();
