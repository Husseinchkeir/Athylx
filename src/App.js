
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import NavBar from './components/NavBar.js';
import Footer from './components/Footer.js';

import Home from './pages/Home.js';
import About from './pages/About.js';
import Menu from './pages/Menu.js';
import Contact from './pages/Contact.js';

import SportContext from './context/SportContext.js';

// PAGE TITLES
const pageTitles = {
  '/': 'Home',
  '/about': 'About',
  '/menu': 'Sports Menu',
  '/contact': 'Contact'
};

const App = () => {

  // FAVORITE SPORT STATE
  const [favorite, setFavorite] = useState(() => {
    try {
      const saved = localStorage.getItem('sportsHubFavorite');

      return ['Football', 'Basketball', 'Tennis'].includes(saved)
        ? saved
        : 'Football';

    } catch {
      return 'Football';
    }
  });

  // CURRENT DEMO USER STATE
  const [demoUser, setDemoUser] = useState(() => {
    try {
      const saved = localStorage.getItem('sportsHubDemoUser');

      if (!saved) {
        return null;
      }

      const account = JSON.parse(saved);

      if (
        account &&
        typeof account.name === 'string' &&
        typeof account.email === 'string' &&
        account.email.trim()
      ) {
        return account;
      }

      return null;

    } catch {
      return null;
    }
  });

  // CURRENT PAGE
  const location = useLocation();

  // SAVE FAVORITE SPORT
  useEffect(() => {
    try {
      localStorage.setItem(
        'sportsHubFavorite',
        favorite
      );
    } catch {
      // Continue without localStorage
    }
  }, [favorite]);

  // SAVE ACTIVE DEMO USER
  useEffect(() => {
    try {
      if (demoUser) {
        localStorage.setItem(
          'sportsHubDemoUser',
          JSON.stringify(demoUser)
        );
      } else {
        localStorage.removeItem('sportsHubDemoUser');
      }
    } catch {
      // Continue without localStorage
    }
  }, [demoUser]);

  // UPDATE BROWSER TITLE AND SCROLL
  useEffect(() => {
    document.title =
      `ATHLYX | ${pageTitles[location.pathname] || 'Home'}`;

    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (

    <SportContext.Provider
      value={{
        favorite,
        setFavorite,
        demoUser,
        setDemoUser
      }}
    >

      <div className="app-shell">

        {/* NAVBAR */}
        <NavBar />

        {/* PAGE ROUTING */}
        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/menu"
            element={
              <Menu
                key={demoUser ? demoUser.email : 'guest'}
              />
            }
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="*"
            element={<Home />}
          />

        </Routes>

        {/* FOOTER */}
        <Footer />

      </div>

    </SportContext.Provider>
  );
};

export default App;
