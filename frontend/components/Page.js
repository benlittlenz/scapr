import { ScrapeProvider } from "./ScrapeContext";

export default function Page({ children }) {
  return (
    <ScrapeProvider
      value={{
        hi: "hello",
        bye: "cya", 
      }}
    >
      <div className="page">{children}</div>
    </ScrapeProvider>
  );
}
