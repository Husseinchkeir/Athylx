
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SportContext from '../context/SportContext.js';
import AuthPanel from '../components/AuthPanel.js';

const highlights = [
  {
    title: 'Football',
    text: 'Follow club matches, important results and upcoming games.'
  },
  {
    title: 'Basketball',
    text: 'Check team news and the main games of the week.'
  },
  {
    title: 'Tennis',
    text: 'Read about players, tournaments and match updates.'
  }
];

const sports = ['Football', 'Basketball', 'Tennis'];

const Home = () => {

  const {
    favorite,
    setFavorite,
    demoUser,
    setDemoUser
  } = useContext(SportContext);

  const navigate = useNavigate();

  const sportIcon =
    favorite === 'Football' ? '⚽' :
    favorite === 'Basketball' ? '🏀' : '🎾';

  return (
    <main className="page">

      {/* HOME HERO */}
      <section className="hero-panel home-hero">

        <div className="home-hero-copy">

          <p className="eyebrow">
            WELCOME TO SPORTS HUB
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

            <button
              className="btn-secondary"
              type="button"
              onClick={() => navigate('/about')}
            >
              Discover Sports Hub
            </button>

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

      {/* SPORTS HIGHLIGHTS */}
      <section className="section-card">

        <h2>Latest Highlights</h2>

        <div className="grid">

          {highlights.map((item) => (
            <article className="card" key={item.title}>

              <h3>{item.title}</h3>

              <p>{item.text}</p>

            </article>
          ))}

        </div>

      </section>

      {/* AUTHENTICATION DEMO - HOME ONLY */}
      <AuthPanel
        demoUser={demoUser}
        favorite={favorite}
        onEnter={setDemoUser}
        onLeave={() => setDemoUser(null)}
        onExplore={() => navigate('/menu')}
      />

    </main>
  );
};

export default Home;
