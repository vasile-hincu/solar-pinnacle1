# X&C Botnari – Solar Energy

Website built with Vite + React + TypeScript + Tailwind (shadcn/ui).

## Local development

Requirements: Node.js + npm.

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## Deploy (Netlify)

- This repo includes SPA routing config via [public/_redirects](public/_redirects) and [netlify.toml](netlify.toml).
- Connect the GitHub repo in Netlify and set:
	- Build command: `npm run build`
	- Publish directory: `dist`
