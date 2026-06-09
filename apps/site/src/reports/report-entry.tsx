import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ExportBar, ThemeProvider } from "reacticle";
import { CaffeineHalfLife } from "./CaffeineHalfLife";

// Entry for the self-contained single-file HTML build (vite.report.config.ts).
// Theme is fixed here; change `theme` (and the article) to build a different look.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme="tufte">
      <ExportBar />
      <CaffeineHalfLife />
    </ThemeProvider>
  </StrictMode>
);
