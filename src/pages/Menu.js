
import { useState, useContext, useEffect } from 'react';
import SportContext from '../context/SportContext.js';
import SportDropdown from '../components/SportDropdown.js';

// SPORTS INFORMATION
const sports = [
  {
    name: 'Football',
    description:
      'Follow European football, major club competitions and upcoming fixtures.',
    featuredTeams: [
      {
        name: 'Arsenal',
        logo: 'https://a.espncdn.com/i/teamlogos/soccer/500/359.png'
      },
      {
        name: 'Real Madrid',
        logo: 'https://a.espncdn.com/i/teamlogos/soccer/500/86.png'
      },
      {
        name: 'Liverpool',
        logo: 'https://a.espncdn.com/i/teamlogos/soccer/500/364.png'
      }
    ]
  },
  {
    name: 'Basketball',
    description:
      'Explore NBA teams, professional basketball and regular-season games.',
    featuredTeams: [
      {
        name: 'Cleveland Cavaliers',
        logo: 'https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/cle.png'
      },
      {
        name: 'New York Knicks',
        logo: 'https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/ny.png'
      },
      {
        name: 'Golden State Warriors',
        logo: 'https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/gs.png'
      }
    ]
  },
  {
    name: 'Tennis',
    description:
      'Follow professional tennis players, ATP tournaments and international matches.',
    featuredTeams: [
      {
        name: 'Carlos Alcaraz',
        logo: 'https://a.espncdn.com/i/headshots/tennis/players/full/3782.png'
      },
      {
        name: 'Jannik Sinner',
        logo: 'https://a.espncdn.com/i/headshots/tennis/players/full/3623.png'
      },
      {
        name: 'Alexander Zverev',
        logo: 'https://a.espncdn.com/i/headshots/tennis/players/full/2375.png'
      }
    ]
  }
];

const validSports = ['All', 'Football', 'Basketball', 'Tennis'];

const sportIcons = {
  Football: '⚽',
  Basketball: '🏀',
  Tennis: '🎾'
};

const getTeamInitials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

const TeamLogo = ({ team, sport }) => {
  const [failed, setFailed] = useState(false);

  if (!team.logo || failed) {
    return (
      <span className={`explore-team__logo explore-team__logo--${sport.toLowerCase()}`} aria-hidden="true">
        {getTeamInitials(team.name)}
      </span>
    );
  }

  return (
    <img
      className="explore-team__logo"
      src={team.logo}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
};

// STATIC EXAMPLE MATCHES
// These are sample entries, not verified live fixtures.
const matches = [
  {
    sport: 'Tennis',
    match: 'Alex Michelsen vs Juan Manuel Cerundolo',
    date: '10 Nov 2026',
    time: '2:00 PM',
    tournament: 'Stockholm Open',
    source: 'https://www.stockholmopen.se/'
  },
  {
    sport: 'Tennis',
    match: 'Holger Rune vs Zizou Bergs',
    date: '10 Nov 2026',
    time: '7:00 PM',
    tournament: 'Stockholm Open',
    source: 'https://www.stockholmopen.se/'
  },
  {
    sport: 'Basketball',
    match: 'Cleveland Cavaliers vs New York Knicks',
    date: '12 Nov 2026',
    time: '2:00 AM',
    tournament: 'NBA Regular Season',
    source: 'https://www.nba.com/schedule'
  },
  {
    sport: 'Basketball',
    match: 'Golden State Warriors vs Houston Rockets',
    date: '12 Nov 2026',
    time: '4:30 AM',
    tournament: 'NBA Regular Season',
    source: 'https://www.nba.com/schedule'
  },
  {
    sport: 'Basketball',
    match: 'Milwaukee Bucks vs Miami Heat',
    date: '19 Nov 2026',
    time: '2:00 AM',
    tournament: 'NBA Regular Season',
    source: 'https://www.nba.com/schedule'
  },
  {
    sport: 'Football',
    match: 'Arsenal vs Borussia Dortmund',
    date: '24 Nov 2026',
    time: '10:00 PM',
    tournament: 'UEFA Champions League',
    source:
      'https://www.uefa.com/uefachampionsleague/fixtures-results/'
  },
  {
    sport: 'Football',
    match: 'Manchester City vs Napoli',
    date: '24 Nov 2026',
    time: '10:00 PM',
    tournament: 'UEFA Champions League',
    source:
      'https://www.uefa.com/uefachampionsleague/fixtures-results/'
  },
  {
    sport: 'Football',
    match: 'Real Madrid vs PSV Eindhoven',
    date: '24 Nov 2026',
    time: '10:00 PM',
    tournament: 'UEFA Champions League',
    source:
      'https://www.uefa.com/uefachampionsleague/fixtures-results/'
  },
  {
    sport: 'Football',
    match: 'Club Brugge vs Liverpool',
    date: '25 Nov 2026',
    time: '10:00 PM',
    tournament: 'UEFA Champions League',
    source:
      'https://www.uefa.com/uefachampionsleague/fixtures-results/'
  }
];

// MENU COMPONENT
const Menu = ({ initialSport }) => {

  // SHARED CONTEXT
  const { favorite, demoUser } = useContext(SportContext);
  const initialSportFilter = validSports.includes(initialSport)
    ? initialSport
    : favorite || 'All';

  // SIGN IN STATUS
  const signedIn = Boolean(demoUser && demoUser.email);

  // ACCOUNT-SPECIFIC STORAGE
  const storageKey = signedIn
    ? `sportsHubSaved:${demoUser.email}`
    : null;

  // SPORT FILTER
  const [sportFilter, setSportFilter] = useState(initialSportFilter);

  // SEARCH
  const [search, setSearch] = useState('');

  // LOAD ACCOUNT'S SAVED MATCHES
  const [savedMatches, setSavedMatches] = useState(() => {

    if (!storageKey) {
      return [];
    }

    try {
      const stored = localStorage.getItem(storageKey);

      if (!stored) {
        return [];
      }

      const parsed = JSON.parse(stored);

      return Array.isArray(parsed) ? parsed : [];

    } catch {
      return [];
    }
  });

  // SAVE MATCHES WHEN STATE CHANGES
  useEffect(() => {

    if (!storageKey) {
      return;
    }

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(savedMatches)
      );
    } catch {
      // Continue if browser storage is unavailable
    }

  }, [savedMatches, storageKey]);

  // Keep the route's initial selection separate from dropdown changes.
  useEffect(() => {
    setSportFilter(
      validSports.includes(initialSport)
        ? initialSport
        : favorite || 'All'
    );
  }, [favorite, initialSport]);

  // SAVE OR REMOVE MATCH
  const toggleSaved = (matchName) => {

    if (!signedIn) {
      return;
    }

    setSavedMatches((current) => {

      if (current.includes(matchName)) {
        return current.filter(
          (name) => name !== matchName
        );
      }

      return [...current, matchName];

    });
  };

  const showSportMatches = (sport, teamName = '') => {
    setSportFilter(sport);
    setSearch(teamName);
    document.getElementById('match-schedule')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  // FILTER MATCHES BY SPORT AND SEARCH
  const filteredMatches = matches.filter((item) => {

    const matchesSport =
      sportFilter === 'All' ||
      item.sport === sportFilter;

    const searchText =
      `${item.sport} ${item.match} ${item.date} ${item.tournament}`
        .toLowerCase();

    const matchesSearch = searchText.includes(
      search.trim().toLowerCase()
    );

    return matchesSport && matchesSearch;
  });

  return (
<main className="page menu-page">
      {/* MENU HERO */}
      <section className="hero-panel small-hero">

        <p className="eyebrow">ATHLYX</p>

        <h1>Sports, Teams & Schedules.</h1>

        <p>
          Explore football, basketball and tennis.
          Discover teams and save your favorite matches.
        </p>

        {signedIn ? (

          <p>
            Welcome, <strong>{demoUser.name}</strong>!
            Your saved matches belong to your profile.
          </p>

        ) : (

          <p>
            You are browsing as a guest.
            Sign in from Home to save matches.
          </p>

        )}

        <p>
          Your favorite sport:
          <strong> {favorite || 'Not selected'}</strong>
        </p>

      </section>

      {/* EXPLORE SPORTS */}
      <section className="section-card">

        <h2>Explore Sports</h2>

        <div className="grid">

          {sports.map((sport) => (

              <article
                className={`card explore-sport-card explore-sport-card--${sport.name.toLowerCase()}`}
              key={sport.name}
            >
                <div className="explore-sport-card__heading">
                  <span aria-hidden="true">{sportIcons[sport.name]}</span>
                  <h3>{sport.name}</h3>
                </div>

                <p>{sport.description}</p>

                <div className="explore-sport-card__featured">
                  <p className="explore-sport-card__label">
                    Featured {sport.name === 'Tennis' ? 'players' : 'teams'}
                  </p>
                  <div className="explore-sport-card__teams">
                    {sport.featuredTeams.map((team) => (
                      <button
                        className="explore-team"
                        key={team.name}
                        type="button"
                        onClick={() =>
                          showSportMatches(
                            sport.name,
                            sport.name === 'Tennis' ? '' : team.name
                          )
                        }
                        aria-label={`Show ${sport.name} matches featuring ${team.name}`}
                      >
                        <TeamLogo team={team} sport={sport.name} />
                        <span>{team.name}</span>
                        <span className="explore-team__arrow" aria-hidden="true">→</span>
                      </button>
                    ))}
                  </div>
                </div>

              </article>

          ))}

        </div>

      </section>

      {/* MATCH SCHEDULE */}
      <section className="section-card" id="match-schedule">

        <h2>Sports Match Schedule</h2>

        <p className="schedule-filter-status">
          Showing:
          <strong>
            {' '}
            {sportFilter === 'All'
              ? 'All Sports'
              : sportFilter}
          </strong>
        </p>

        {/* FILTER AND SEARCH */}
        <div className="toolbar">

          <SportDropdown
            value={sportFilter}
            includeAll={true}
            onChange={(sport) => {
              setSportFilter(sport);
              setSearch('');
            }}
          />

          <input
            type="text"
            placeholder="Search team, player or tournament"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
            >
              Clear Search
            </button>
          )}

        </div>

        <p className="muted">
          {filteredMatches.length} matches found.
          Schedule entries are static examples.
        </p>

        {/* MATCH SCHEDULE TABLE */}
        <div className="table-wrap">

          <table>

            <caption>ATHLYX Match Schedule</caption>

            <thead>
              <tr>
                <th>Sport</th>
                <th>Match</th>
                <th>Competition</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredMatches.map((item) => (

                <tr key={`${item.sport}-${item.match}`}>

                  <td>
                    <span className="match-sport">
                      <span aria-hidden="true">{sportIcons[item.sport]}</span>
                      {item.sport}
                    </span>
                  </td>

                  <td>
                    <span className="match-versus">
                      {item.match.split(' vs ').map((team, index) => (
                        <span className="match-versus__team" key={team}>
                          {index > 0 && (
                            <span
                              className="match-versus__separator"
                              aria-hidden="true"
                            >
                              VS
                            </span>
                          )}
                          {team}
                        </span>
                      ))}
                    </span>
                  </td>

                  <td>
                    <span className="match-detail">
                      <span aria-hidden="true">🏆</span>
                      {item.tournament}
                    </span>
                  </td>

                  <td>
                    <span className="match-detail">
                      <span aria-hidden="true">📅</span>
                      {item.date}
                    </span>
                  </td>

                  <td>
                    <span className="match-detail">
                      <span aria-hidden="true">🕒</span>
                      {item.time}
                    </span>
                  </td>

                  <td>

                    {/* SAVE / REMOVE */}
                    <button
                      type="button"
                      disabled={!signedIn}
                      onClick={() =>
                        toggleSaved(item.match)
                      }
                    >
                      <span aria-hidden="true">
                        {savedMatches.includes(item.match) ? '✓' : '＋'}
                      </span>
                      {!signedIn
                        ? 'Sign in to save'
                        : savedMatches.includes(item.match)
                          ? 'Remove'
                          : 'Save'}
                    </button>

                    {' '}

                    {/* OFFICIAL SCHEDULE */}
                    <a
                      href={item.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="schedule-btn"
                    >
                      <span aria-hidden="true">↗</span>
                      Official Schedule
                    </a>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* NO SEARCH RESULTS */}
        {filteredMatches.length === 0 && (

          <p className="notice">
            No matches found.
            Try another sport or search term.
          </p>

        )}

      </section>

      {/* IMPROVED MY SAVED MATCHES */}
      <section className="section-card">

        <h2>
          My Saved Matches
          {signedIn ? ` (${savedMatches.length})` : ''}
        </h2>

        {!signedIn ? (

          <p>
            Sign in from the Home page to view
            and save your personal matches.
          </p>

        ) : (

          <>

            <p className="muted">
              Saved for: {demoUser.name}
            </p>

            {savedMatches.length === 0 ? (

              <p>
                No saved matches yet.
                Click Save beside a match to add it.
              </p>

            ) : (

              // SHOW COMPLETE INFORMATION FOR SAVED MATCHES
              <div className="table-wrap">

                <table>

                  <caption>
                    Your personal saved matches
                  </caption>

                  <thead>
                    <tr>
                      <th>Sport</th>
                      <th>Match</th>
                      <th>Competition</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {savedMatches.map((matchName) => {

                      // Find complete match information
                      const match = matches.find(
                        (item) => item.match === matchName
                      );

                      return (

                        <tr key={matchName}>

                          <td>
                            {match ? match.sport : '—'}
                          </td>

                          <td>
                            {matchName}
                          </td>

                          <td>
                            {match
                              ? match.tournament
                              : 'Unavailable'}
                          </td>

                          <td>
                            {match ? match.date : '—'}
                          </td>

                          <td>
                            {match ? match.time : '—'}
                          </td>

                          <td>

                            <button
                              type="button"
                              onClick={() =>
                                toggleSaved(matchName)
                              }
                            >
                              Remove
                            </button>

                          </td>

                        </tr>

                      );
                    })}

                  </tbody>

                </table>

              </div>

            )}

          </>

        )}

      </section>

    </main>
  );
};

export default Menu;
