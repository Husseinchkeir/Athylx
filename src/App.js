
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar.js';
import Footer from './components/Footer.js';

import Home from './pages/Home.js';
import About from './pages/About.js';
import Menu from './pages/Menu.js';
import Contact from './pages/Contact.js';

import SportContext from './context/SportContext.js';

const PageEffects = ({ path, title, children }) => {
  useEffect(() => {
    document.title = `ATHLYX | ${title}`;
    window.scrollTo(0, 0);
  }, [path, title]);

  return children;
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
            element={
              <PageEffects path="/" title="Home">
                <Home />
              </PageEffects>
            }
          />

          <Route
            path="/about"
            element={
              <PageEffects path="/about" title="About">
                <About />
              </PageEffects>
            }
          />

          <Route
            path="/menu"
            element={
              <PageEffects path="/menu" title="Sports Menu">
                <Menu key={demoUser ? demoUser.email : 'guest'} />
              </PageEffects>
            }
          />

          <Route
            path="/menu/football"
            element={
              <PageEffects path="/menu/football" title="Sports Menu">
                <Menu
                  initialSport="Football"
                  key={demoUser ? demoUser.email : 'guest'}
                />
              </PageEffects>
            }
          />

          <Route
            path="/menu/basketball"
            element={
              <PageEffects path="/menu/basketball" title="Sports Menu">
                <Menu
                  initialSport="Basketball"
                  key={demoUser ? demoUser.email : 'guest'}
                />
              </PageEffects>
            }
          />

          <Route
            path="/menu/tennis"
            element={
              <PageEffects path="/menu/tennis" title="Sports Menu">
                <Menu
                  initialSport="Tennis"
                  key={demoUser ? demoUser.email : 'guest'}
                />
              </PageEffects>
            }
          />

          <Route
            path="/contact"
            element={
              <PageEffects path="/contact" title="Contact">
                <Contact />
              </PageEffects>
            }
          />

          <Route
            path="*"
            element={
              <PageEffects path="*" title="Home">
                <Home />
              </PageEffects>
            }
          />

        </Routes>

        {/* FOOTER */}
        <Footer />

      </div>

    </SportContext.Provider>
  );
};

export default App;
