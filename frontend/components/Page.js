import { useEffect, useState } from "react";
import { ScrapeProvider } from "./ScrapeContext";

function useScrapes() {
  const [scrapes, setScrapes] = useState({
    twitter: [],
    insta: []
  });
  useEffect(function() {
    (async () => {
      const res = await fetch("http://localhost:4000/data");
      const data = await res.json();
      console.log(data);
      setScrapes(data);
    })();
  }, []);
  return scrapes;
}

export default function Page({ children }) {
  const scrapes = useScrapes();

  return (
    <ScrapeProvider
      value={{
        scrapes,
      }}
    >
      <div className="page">{children}</div>
    </ScrapeProvider>
  );
}
