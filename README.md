# ATHLYX — Closer to the Game

**Sports Discovery and Match Management Platform**

ATHLYX is a sports web application developed using ReactJS for the CSCI426 Advanced Web Programming course at Lebanese International University.

The website allows users to explore football, basketball, and tennis, browse example match schedules, search for matches, filter sports, and save selected matches to their profiles.

ATHLYX focuses on an interactive and responsive user experience with a dark navy interface, neon-green accents, and simple navigation.

## Project Information

- **Student:** Hussein Chouceir
- **Student ID:** 72330849
- **University:** Lebanese International University (LIU)
- **Course:** CSCI426 — Advanced Web Programming
- **Project:** Phase 1 — Fall 2026
- **Project Type:** Individual

## Features

### Sports Exploration
Users can browse football, basketball, and tennis through the Home and Sports Menu pages.

### Favorite Sport
Users can select a preferred sport from the Home page. The selected preference is stored in the browser.

### Sports Menu
Users can view example match schedules, search for matches, and filter results by sport.

### User Profiles
The website includes a frontend registration and sign-in demonstration. Users can create a local profile and sign out.

### Saved Matches
Signed-in profiles can save and remove selected matches. Saved data is kept in the browser.

### Responsive Design
The interface includes responsive layouts, navigation, sports cards, and match tables for different screen sizes.

## Website Pages

| Page | Description |
|---|---|
| Home | Introduction, sports highlights, favorite sport selection, and account interface |
| About | Website information and purpose |
| Sports Menu | Match schedules, search, filtering, and saved matches |
| Contact | Contact form and information |

## Technologies and Course Concepts

The project applies the following ReactJS and JavaScript concepts covered in the course materials:

| Concept | Purpose in ATHLYX |
|---|---|
| ReactJS | Building website components |
| JavaScript (.js) | Application logic and interactions |
| React Router | Navigation between pages |
| Components | Organizing the website into reusable sections |
| Props | Passing information between components |
| useState | Managing changing values |
| useEffect | Handling updates and side effects |
| useContext | Sharing information between components |
| React Events | Handling buttons and form interactions |
| CSS | Website styling and responsive layouts |

## Installation

### Requirements

- Node.js
- npm

### Run Locally

Clone the repository:

```bash
git clone https://github.com/Husseinchkeir/sport-hub-new.git
```

Open the project directory:

```bash
cd sport-hub-new
```

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm run dev
```

The local website address will appear in the terminal.

For Windows PowerShell, `npm.cmd` can be used instead of `npm` when script execution is restricted.

### Production Build

```bash
npm run build
```

The generated website files are placed in the `dist` folder.



## GitHub and Deployment

The source code is maintained using Git and GitHub.

**Repository:**

https://github.com/Husseinch
**Live Website:** https://athylx-nu.vercel.app