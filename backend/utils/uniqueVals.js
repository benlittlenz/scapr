export function uniqueCount(scrapes) {
  return scrapes.reduce((acc, scrape) => {
    if (!acc.find(el => el.count === scrape.count)) {
      return [...acc, scrape];
    }
    return acc;
  }, []);
}
