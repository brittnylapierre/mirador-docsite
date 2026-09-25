# Mirador Documentation

A Nextra guide website for Mirador with two top-level sections:

- User Guide
- Install & Config Guide

Built from:

- https://projectmirador.org/
- https://github.com/projectmirador/mirador/wiki
- https://projectmirador.org/demo/

## Local Development

```bash
npm install
npm run dev
```

The dev server runs on http://localhost:3003.

## Contributing To The Docs

Docs live in `content/` and are written as MDX for Nextra.

1. Create a branch for your change.
2. Run `npm install`.
3. Start the local docs site with `npm run dev`.
4. Edit or add pages in `content/`.
5. If you add, remove, or rename a page, update the matching `_meta.js` file so it appears in the sidebar.
6. Keep user-facing guide pages focused on using Mirador. Put install, configuration, theming, and plugin material in `content/install-config/`.
7. Run `npm run build` before opening a pull request.

Useful files:

- `content/index.mdx` controls the home page.
- `content/user-guide/` contains end-user documentation.
- `content/install-config/` contains implementation documentation.
- `app/globals.css` contains site-level styling.
- `app/components/` contains client components used inside MDX pages.

## Build

```bash
npm run build
```

The build also generates the Pagefind search index in `public/_pagefind`.

## Deploying To Netlify

Netlify is connected to this repository and deploys from the `main` branch. Push or merge changes to
`main` to trigger a production deploy.

The checked-in `netlify.toml` sets:

- Build command: `npm run build`
- Publish directory: `.next`
- Node version: `24`

Deployment flow:

1. Open a pull request against `main`.
2. Review the Netlify deploy preview for the pull request.
3. Merge the pull request into `main`.
4. Netlify builds and publishes the production site from `main`.

Netlify supports Next.js through its OpenNext adapter, so you should not need to install a separate
Next.js plugin for this site. See Netlify's Next.js docs:
https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/
