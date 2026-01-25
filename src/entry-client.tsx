import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");
if (!container) throw new Error("Missing #root element");

const app = (
  <HelmetProvider>
    <App Router={({ children }) => <BrowserRouter>{children}</BrowserRouter>} />
  </HelmetProvider>
);

// Support both SSR (hydrate) and plain SPA builds (render).
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
