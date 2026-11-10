
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../styles/NavBar.css';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/menu', label: 'Sports Menu' },
  { path: '/contact', label: 'Contact' }
];

const NavBar = () => {

  // Mobile menu state
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">

      <nav className="navbar" aria-label="Main navigation">

        {/* LOGO */}
        <Link
          className="brand"
          to="/"
          onClick={() => setOpen(false)}
        >
          <img src="/athlyx-icon.png" alt="ATHLYX logo" />
          <span>ATHLYX</span>
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          className="menu-button"
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          ☰
        </button>

        {/* NAVIGATION LINKS */}
        <div className={open ? 'nav-links open' : 'nav-links'}>

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                isActive ? 'active' : ''
              }
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}

        </div>

      </nav>

    </header>
  );
};

export default NavBar;
