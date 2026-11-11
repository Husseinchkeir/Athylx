
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import SportContext from '../context/SportContext.js';
import AuthPanel from '../components/AuthPanel.js';

import '../styles/HomeHighlights.css';

// REAL SPORTS PHOTOGRAPHS
const highlights = [
  {
    title: 'Football',
    icon: '⚽',
    label: 'THE BEAUTIFUL GAME',
    text: 'Follow club matches, discover teams and explore upcoming football fixtures.',
    image:
      'https://images.unsplash.com/photo-1769859177914-f66488d71193?auto=format&fit=crop&w=1000&q=85'
  },
  {
    title: 'Basketball',
    icon: '🏀',
    label: 'BEYOND THE COURT',
    text: 'Explore professional basketball, team matchups and upcoming NBA games.',
    image:
      'https://images.unsplash.com/photo-1541915803885-12f5c95b1669?auto=format&fit=crop&w=1000&q=85'
  },
  {
    title: 'Tennis',
    icon: '🎾',
    label: 'EVERY POINT MATTERS',
    text: 'Discover tennis tournaments, professional players and upcoming matches.',
    image:
      'https://images.unsplash.com/photo-1568663469495-b09d5e3c2e07?auto=format&fit=crop&w=1000&q=85'
  }
];

const sports = ['Football', 'Basketball', 'Tennis'];

const Home = () => {

  // SHARED CONTEXT
  const {
    favorite,
    setFavorite,
    demoUser,
    setDemoUser
  } = useContext(SportContext);

  // FAVORITE SPORT ICON
  const sportIcon =
    favorite === 'Football' ? '⚽' :
    favorite === 'Basketball' ? '🏀' : '🎾';

  return (
    <main className="page">

      {/* HOME HERO */}
      <section className="hero-panel home-hero">

        <div className="home-hero-copy">

          <p className="eyebrow">
            WELCOME TO ATHLYX
          </p>

          {demoUser && (
            <p>
              Welcome back, {demoUser.name}! 👋
            </p>
          )}

          <h1>
            CLOSER TO
            <span className="home-gradient-text">
              {' '}THE GAME.
            </span>
          </h1>

          <p>
            Your destination for football, basketball
            and tennis. Explore sports schedules,
            discover teams and save the matches
            that matter to you.
          </p>

          <div className="hero-actions">

            <Link
              className="btn-secondary"
              to="/about"
            >
              Discover ATHLYX
            </Link>

          </div>

          <div className="home-hero-meta">
            <span>03 SPORTS</span>
            <span>SPORTS SCHEDULES</span>
            <span>SAVED MATCHES</span>
          </div>

        </div>

        {/* FAVORITE SPORT SHOWCASE */}
        <div className="home-showcase">

          <div className="home-showcase-heading">
            <span>YOUR SPORTS CENTER</span>
            <span className="showcase-dot"></span>
          </div>

          <div className="home-sport-visual">
            {sportIcon}
          </div>

          <div className="home-showcase-feature">
            <span>YOUR FAVORITE SPORT</span>

            <h2>{favorite}</h2>

            <p>
              Explore your sport's upcoming fixtures.
            </p>
          </div>

          <div className="home-showcase-tags">

            {sports.map((sport) => (
              <button
                key={sport}
                type="button"
                className={
                  favorite === sport ? 'selected' : ''
                }
                onClick={() => setFavorite(sport)}
              >
                {sport.toUpperCase()}
              </button>
            ))}

          </div>

        </div>

      </section>

      {/* NEW CINEMATIC SPORTS HIGHLIGHTS */}
      <section className="section-card highlights-section">

        <div className="highlights-heading">
          <div>
            <h2>Latest Highlights</h2>

            <p className="highlights-subtitle">
              Three sports. One destination.
              Explore what moves you.
            </p>
          </div>

          <span className="highlights-heading-tag">
            EXPLORE ATHLYX
          </span>
        </div>

        <div className="grid highlights-grid">

          {highlights.map((item) => (

            <article
              className={
                `card highlight-card highlight-card--${item.title.toLowerCase()}`
              }
              key={item.title}
            >

              {/* REAL SPORTS BACKGROUND */}
              <div className="highlight-card__image-wrap">
                <img
                  className="highlight-card__image"
                  src={item.image}
                  alt=""
                  loading="lazy"
                />
              </div>

              {/* DARK GRADIENT OVERLAY */}
              <div className="highlight-card__overlay"></div>

              {/* CARD CONTENT */}
              <div className="highlight-card__content">

                <div className="highlight-card__top">

                  <span className="highlight-card__icon">
                    {item.icon}
                  </span>

                  <span className="highlight-card__number">
                    0{highlights.indexOf(item) + 1}
                  </span>

                </div>

                <div className="highlight-card__bottom">

                  <span className="highlight-card__label">
                    {item.label}
                  </span>

                  <h3>{item.title}</h3>

                  <p>{item.text}</p>

                  {/* WORKING EXPLORE BUTTON */}
                  <Link
                    className="highlight-card__action"
                    to={`/menu/${item.title.toLowerCase()}`}
                  >
                    Explore {item.title}

                    <span
                      className="highlight-card__arrow"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>

                </div>

              </div>

            </article>

          ))}

        </div>

      </section>

      {/* SIGN IN / SIGN UP */}
      <AuthPanel
        demoUser={demoUser}
        favorite={favorite}
        onEnter={setDemoUser}
        onLeave={() => setDemoUser(null)}
      />

    </main>
  );
};

export default Home;
