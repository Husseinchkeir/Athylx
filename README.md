# ATHLYX — Closer to the Game

ATHLYX is a ReactJS sports hub for exploring football, basketball and tennis
schedules, filtering matches, and saving personal match lists in a demo profile.
The project retains its dark navy theme, neon-green accents and four-page layout.

## Features

- Four React Router pages: Home, About, Sports Menu and Contact.
- Separate persistent favorite sport selection and temporary match filters.
- Match schedule filtering by sport and search by team/player or tournament.
- Frontend demo registration/sign-in, active profile and sign-out.
- Per-profile saved matches persisted in browser local storage.
- Responsive navigation, schedule tables, sports cards and image highlights.

> **Authentication limitation:** sign-in is a frontend demonstration, not secure
> password authentication. Registration stores profile details only; passwords
> are neither verified nor saved. Do not enter a real password.
>
> **Schedule limitation:** the displayed schedule entries are static examples,
> not live or verified fixtures. Contact form submissions are also kept only in
> the current page session.

## Technology

- React 18 and React DOM
- React Router 6
- JavaScript (`.js`) with JSX transformed by Babel
- Webpack 5 with Babel, CSS and asset loaders
- Browser local storage for the existing demo profile and saved-match data

## Requirements

- Node.js 18.20 or newer
- npm

## Install and run locally

From the folder containing `package.json`:

```powershell
npm.cmd install
npm.cmd run dev
```

Open the local address printed by Webpack (normally
`http://127.0.0.1:3000`). On Windows, `npm.cmd` avoids PowerShell execution
policy restrictions that can block `npm`.

The development server supports direct visits and refreshes on all four
client-side routes.

## Production build

```powershell
npm.cmd run build
```

Webpack writes the production site to `dist/`. Deploy the contents of that
directory as a static website; the Vercel configuration in this repository
rewrites client-side routes to `index.html`.

## Vercel deployment

1. Push this repository to GitHub and import it into Vercel.
2. Set **Framework Preset** to **Other**.
3. Set **Build Command** to `npm run build`.
4. Set **Output Directory** to `dist`.
5. Leave the install command at `npm install`; no environment variables are
   required.
6. Deploy. The included `vercel.json` sends application routes to the React
   entry document so direct URLs and refreshes work.

No live deployment link is available yet.

## Screenshots

Add current screenshots of the Home, About, Sports Menu and Contact pages here
before submission.

## Credits

- Sports highlight photographs are loaded from Unsplash image URLs referenced
  in `src/pages/Home.js`; the original project did not include photographer
  attribution.
- The ATHLYX logo and favicon are provided as `src/assets/athlyx-icon.png`.
  The original asset bundle did not include separate source attribution.
- Featured football and basketball team logos and tennis player headshots use
  ESPN CDN image URLs; initials are shown if an image cannot be loaded.
- Match entries and linked official schedule pages are listed in
  `src/pages/Menu.js`.

## Contribution statement

Add the student's name and confirm individual/group contribution details here
before submission.

## Course requirement to resolve

The current application contains the four pages listed above. The assignment's
five-page requirement remains unresolved; a fifth page has intentionally not
been added pending course guidance.

## Repository

[Husseinchkeir/sport-hub-new](https://github.com/Husseinchkeir/sport-hub-new)
