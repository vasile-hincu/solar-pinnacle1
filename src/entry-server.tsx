import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

export function render(url: string) {
  const appHtml = renderToString(
    <App
      Router={({ children }) => <StaticRouter location={url}>{children}</StaticRouter>}
    />
  );

  return { appHtml };
}
