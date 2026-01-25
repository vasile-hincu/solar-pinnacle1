import fs from "node:fs";
import path from "node:path";
import express from "express";

const isProd = process.env.NODE_ENV === "production";
const port = process.env.PORT ? Number(process.env.PORT) : 8080;
const base = process.env.BASE || "/";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();

let vite;
if (!isProd) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  const sirv = (await import("sirv")).default;
  app.use(base, sirv(path.resolve(__dirname, "dist/client"), { extensions: [] }));
}

app.use("*", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "/");

    let template;
    let render;

    if (!isProd) {
      template = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
    } else {
      template = fs.readFileSync(
        path.resolve(__dirname, "dist/client/index.html"),
        "utf-8"
      );
      render = (await import(path.resolve(__dirname, "dist/server/entry-server.js"))).render;
    }

    const { appHtml } = await render(url);

    const html = template.replace("<!--app-html-->", appHtml);

    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (e) {
    if (!isProd && vite) vite.ssrFixStacktrace(e);
    console.error(e);
    res.status(500).end(String(e));
  }
});

app.listen(port, () => {
  console.log(`SSR server running at http://localhost:${port}${base}`);
});
