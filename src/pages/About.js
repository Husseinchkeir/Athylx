import { Link } from 'react-router-dom';

const features = [
  {
    icon: '⚽',
    title: 'Find your sport',
    description:
      'Explore football, basketball and tennis in one place, with featured teams and players to help you get started.'
  },
  {
    icon: '📅',
    title: 'Follow the schedule',
    description:
      'Filter the match list by sport and search by team, player or tournament to find the details you need.'
  },
  {
    icon: '☆',
    title: 'Keep your picks close',
    description:
      'Sign in to the demo profile to save matches. Your saved list stays associated with that profile on this browser.'
  }
];

const steps = [
  {
    number: '01',
    title: 'Choose a sport',
    description: 'Set a favorite on Home or browse any sport from the menu.'
  },
  {
    number: '02',
    title: 'Explore matches',
    description: 'Use the schedule filters and search to narrow down the list.'
  },
  {
    number: '03',
    title: 'Save your picks',
    description: 'Sign in to the frontend demo to save and revisit matches.'
  }
];

const About = () => (
  <main className="page about-page">
    <section className="hero-panel small-hero about-hero">
      <p className="eyebrow">ABOUT ATHLYX</p>
      <h1>For the love of the game.</h1>
      <p className="about-hero__intro">
        ATHLYX brings sports discovery and match schedules together in a
        focused space for fans. Find your sport, follow the fixtures, and keep
        the matches you care about close.
      </p>
      <div className="hero-actions">
        <Link className="btn" to="/menu">Explore sports</Link>
        <Link className="btn-secondary" to="/contact">Get in touch</Link>
      </div>
      <div className="about-hero__meta" aria-label="Project overview">
        <span><strong>03</strong> sports</span>
        <span><strong>04</strong> pages</span>
        <span><strong>Built for</strong> fans</span>
      </div>
    </section>

    <section className="section-card about-section">
      <div className="about-section__heading">
        <p className="eyebrow">WHAT YOU CAN DO</p>
        <h2>A better way to keep up.</h2>
        <p>
          Everything is designed to make browsing simple, whether you are
          checking a schedule or choosing what to follow.
        </p>
      </div>
      <div className="about-feature-grid">
        {features.map((feature) => (
          <article className="about-feature-card" key={feature.title}>
            <span className="about-feature-card__icon" aria-hidden="true">
              {feature.icon}
            </span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="section-card about-section about-how">
      <div className="about-section__heading">
        <p className="eyebrow">MADE TO BE SIMPLE</p>
        <h2>From kickoff to your saved list.</h2>
      </div>
      <ol className="about-steps">
        {steps.map((step) => (
          <li className="about-step" key={step.number}>
            <span className="about-step__number">{step.number}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>

    <section className="about-note">
      <span className="about-note__icon" aria-hidden="true">i</span>
      <p>
        <strong>A project demo, not a live results service.</strong>
        <span>
          Match schedules are sample content and may not reflect current
          fixtures. Sign-in is a frontend demonstration, not secure account
          authentication.
        </span>
      </p>
    </section>
  </main>
);

export default About;
