import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/theme-provider.tsx";
import { TextAnalyzerProvider } from "./context/text-analizer-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TextAnalyzerProvider>
        <App />
      </TextAnalyzerProvider>
    </ThemeProvider>
  </StrictMode>
);
