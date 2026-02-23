# NUIF Website

Main website designed to showcase the fund's mission, team members, and investment research.

![Image](.github/images/img.png)

# Development

## Setup

### Get a local copy

If you already have this repository locally and only need the latest changes:

```bash
cd path/to/NUIF_Main_Web
git pull
```

If you do not have a local copy yet, you can clone with any of the following:

HTTPS:

```bash
cd path/to/where/you/want/the/project
git clone https://github.com/NUIF-Digital-Infrastructure/NUIF_Main_Web.git
cd NUIF_Main_Web
```

SSH:

```bash
cd path/to/where/you/want/the/project
git clone git@github.com:NUIF-Digital-Infrastructure/NUIF_Main_Web.git
cd NUIF_Main_Web
```

GitHub CLI:

```bash
cd path/to/where/you/want/the/project
gh repo clone NUIF-Digital-Infrastructure/NUIF_Main_Web
cd NUIF_Main_Web
```

If you do not use Git, download a ZIP instead:

1. Open: https://github.com/NUIF-Digital-Infrastructure/NUIF_Main_Web
2. Click `Code` then `Download ZIP`
3. Extract the ZIP to your chosen folder
4. Open a terminal in the extracted folder (for example `NUIF_Main_Web`)
5. Run the setup commands below

Install Node dependencies with either:

```bash
pnpm install
```

or:

```bash
npm install
```

This project also uses a Python script therefore you must have Python installed, and you must run:

```bash
pip install -r requirements.txt
```

or it will not build.

## Important directories

- `app/`: Main application code (pages, components, logic, and routes).
- `assets/`: Source design/media assets used by the project.
- `components/`: Reusable UI components shared across pages.
- `data/`: Structured content and data files used by the site.
- `hooks/`: Reusable custom React hooks.
- `lib/`: Shared utilities, helpers, and support logic.
- `public/`: Static assets served by Next.js (e.g. images, documents, etc.).
- `scripts/`: Utility and automation scripts used by the project.
- `styles/`: Global styles and shared styling resources.

## Development

In order to test your changes you can run:

```bash
pnpm dev
```

or:

```bash
npm run dev
```

and a Next.JS development server will be loaded consequently.

## Build

In order to build the project once you have set it up you can run:

```bash
pnpm build
```

or:

```bash
npm run build
```

NextJS will build the site creating static/dynamic routes where required.

## Hosting

The site is hosted using [Vercel](https://vercel.com/), you can link a GitHub repository to host a copy of this site or
you can build the site and host it with a reverse-proxy such as Traefik or Nginx.

# Website

https://newcastleuniversityinvestmentfund.com/

# Contributors

[Samraat Jain](https://github.com/SamraatJain9), [James Delin](https://github.com/jd-0001), [Sarah Rafiepour](https://github.com/sarahr15), [Ryan Duong](https://github.com/RyanDuong0), [Shalom Ademuwagun](https://github.com/ChachyDev)
