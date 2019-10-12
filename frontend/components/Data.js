import { useContext } from "react";
import { ScrapeContext } from "./ScrapeContext";
import { formatDistance } from "date-fns";

export default function Data() {
  const { scrapes } = useContext(ScrapeContext);
  return (
    <div>
      <ul>
        {scrapes.twitter.map(item => {
          return (
            <li key={item.date}>
              {item.count}- {formatDistance(new Date(item.date), new Date())}
            </li>
          );
        })}
      </ul>
      <h2>Data: {scrapes.twitter.length}</h2>
    </div>
  );
}
