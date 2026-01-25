import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

export function render(url: string) {
  const helmetContext: { helmet?: any } = {};

  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <App
        Router={({ children }) => (
          <StaticRouter location={url}>{children}</StaticRouter>
        )}
      />
    </HelmetProvider>
  );

  const helmet = helmetContext.helmet;
  const headTags =
    (helmet?.title?.toString?.() ?? "") +
    (helmet?.meta?.toString?.() ?? "") +
    (helmet?.link?.toString?.() ?? "") +
    (helmet?.script?.toString?.() ?? "");

  return { appHtml, headTags };
}
