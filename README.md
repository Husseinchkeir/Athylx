# Sports Hub — Web2 (.js files + React Router)

This is the original Sports Hub design updated for Web2. It keeps the existing CSS,
logo, Home, About, Sports Menu, and Contact pages while converting all React
components from `.jsx` to `.js` and adding **React Router**.

## Run it on Windows

1. Extract this ZIP into its own folder.
2. Open that folder in VS Code. Open a terminal **inside the folder containing `package.json`**.
3. Run:

   ```powershell
   npm.cmd install
   npm.cmd run dev
   ```

4. Open the local URL printed by Vite (normally http://127.0.0.1:5173/).

`npm.cmd` avoids the PowerShell execution-policy problem that sometimes blocks `npm`.
You will need an internet connection for the first `npm.cmd install` because
`react-router-dom` has been added. Do not open `index.html` directly in a browser.

## Features / what was changed

- **Routing:** `BrowserRouter` in `src/main.js`, `<Routes>` and `<Route>` in `src/App.js`, `NavLink` in `src/components/NavBar.js`, `useNavigate` in `src/pages/Home.js`.
- **Pages / URLs:** `/` (Home), `/about` (About), `/menu` (Sports Menu), `/contact` (Contact). Browser back/forward and navbar active states work with React Router.
- **useState:** favorite sport on `App.js`, menu search/filter, contact form, mobile navigation.
- **useContext:** shared favorite in `src/context/SportContext.js` with `SportContext.Provider` in App.js, used in Home and Menu.
- **useEffect:** persist the favorite sport in localStorage and update page title/scroll when route changes.
- **useMemo:** original Menu schedule filtering retained as a previous project feature. This is not necessary to understand the professor's hook scope.
- **JS extension:** every React component uses `.js`. `vite.config.js` transforms JSX syntax inside `.js`.
- Original logo, page content, CSS styling and contact form retained.

## Test checklist

1. Select Basketball on Home, go to Sports Menu, confirm the favorite says Basketball.
2. Open Sports Menu; the schedule should already show only Basketball. Select **All sports** in the same filter dropdown to see the full schedule. Choose Basketball again to filter it.
3. Refresh the browser, return Home: Basketball should still be selected.
4. Click About and Contact. Confirm both work, including the form's messages.
5. Press Back and Forward in the browser; the correct route should display.
6. Stop Vite with Ctrl+C and run `npm.cmd run build` to check for compilation errors.

## Files to submit

Submit the extracted source project or this ZIP, according to your professor's instructions.
Do not include `node_modules` or `dist` unless your professor asks.

> Note: This ZIP was reconstructed from the Sports Hub project archive available in your ChatGPT files. Any local edits you made after that archived copy (beyond the favorite-sport context described in chat) are not included.

### Favorite schedule filter

When you open the Menu, the Upcoming Matches schedule automatically shows your saved favorite sport from Home. Use the single sport filter dropdown to choose **All sports**, **Football**, **Basketball** or **Tennis**. There is no separate favorite button; the dropdown starts on your saved favorite when Menu opens. Changing the sport also clears the search so the schedule is visible.
