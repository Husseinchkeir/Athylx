
import { useState, useContext, useEffect } from 'react';
import SportContext from '../context/SportContext.js';
import SportDropdown from '../components/SportDropdown.js';

// SPORTS INFORMATION
const sports = [
  {
    name: 'Football',
    description:
      'Follow European football, major club competitions and upcoming fixtures.',
    team:
      'Real Madrid, Arsenal, Manchester City, Liverpool, Bayern Munich'
  },
  {
    name: 'Basketball',
    description:
      'Explore NBA teams, professional basketball and regular-season games.',
    team:
      'Golden State Warriors, Cleveland Cavaliers, New York Knicks, Houston Rockets'
  },
  {
    name: 'Tennis',
    description:
      'Follow professional tennis players, ATP tournaments and international matches.',
    team:
      'Carlos Alcaraz, Alexander Zverev, Holger Rune, Lorenzo Musetti'
  }
];

// STATIC EXAMPLE MATCHES
// These are sample entries, not verified live fixtures.
const matches = [
  {
    sport: 'Tennis',
    match: 'Alex Michelsen vs Juan Manuel Cerundolo',
    date: '10 Nov 2026',
    time: '2:00 PM',
    tournament: 'Stockholm Open',
    status: 'Example',
    source: 'https://www.stockholmopen.se/'
  },
  {
    sport: 'Tennis',
    match: 'Holger Rune vs Zizou Bergs',
    date: '10 Nov 2026',
    time: '7:00 PM',
    tournament: 'Stockholm Open',
    status: 'Example',
    source: 'https://www.stockholmopen.se/'
  },
  {
    sport: 'Basketball',
    match: 'Cleveland Cavaliers vs New York Knicks',
    date: '12 Nov 2026',
    time: '2:00 AM',
    tournament: 'NBA Regular Season',
    status: 'Example',
    source: 'https://www.nba.com/schedule'
  },
  {
    sport: 'Basketball',
    match: 'Golden State Warriors vs Houston Rockets',
    date: '12 Nov 2026',
    time: '4:30 AM',
    tournament: 'NBA Regular Season',
    status: 'Example',
    source: 'https://www.nba.com/schedule'
  },
  {
    sport: 'Basketball',
    match: 'Milwaukee Bucks vs Miami Heat',
    date: '19 Nov 2026',
    time: '2:00 AM',
    tournament: 'NBA Regular Season',
    status: 'Example',
    source: 'https://www.nba.com/schedule'
  },
  {
    sport: 'Football',
    match: 'Arsenal vs Borussia Dortmund',
    date: '24 Nov 2026',
    time: '10:00 PM',
    tournament: 'UEFA Champions League',
    status: 'Example',
    source:
      'https://www.uefa.com/uefachampionsleague/fixtures-results/'
  },
  {
    sport: 'Football',
    match: 'Manchester City vs Napoli',
    date: '24 Nov 2026',
    time: '10:00 PM',
    tournament: 'UEFA Champions League',
    status: 'Example',
    source:
      'https://www.uefa.com/uefachampionsleague/fixtures-results/'
  },
  {
    sport: 'Football',
    match: 'Real Madrid vs PSV Eindhoven',
    date: '24 Nov 2026',
    time: '10:00 PM',
    tournament: 'UEFA Champions League',
    status: 'Example',
    source:
      'https://www.uefa.com/uefachampionsleague/fixtures-results/'
  },
  {
    sport: 'Football',
    match: 'Club Brugge vs Liverpool',
    date: '25 Nov 2026',
    time: '10:00 PM',
    tournament: 'UEFA Champions League',
    status: 'Example',
    source:
      'https://www.uefa.com/uefachampionsleague/fixtures-results/'
  }
];

// MENU COMPONENT
const Menu = () => {

  // SHARED CONTEXT
  const { favorite, demoUser } = useContext(SportContext);

  // SIGN IN STATUS
  const signedIn = Boolean(demoUser && demoUser.email);

  // ACCOUNT-SPECIFIC STORAGE
  const storageKey = signedIn
    ? `sportsHubSaved:${demoUser.email}`
    : null;

  // SPORT FILTER
  const [sportFilter, setSportFilter] = useState(
    favorite || 'All'
  );

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

  // UPDATE FILTER WHEN FAVORITE CHANGES
  useEffect(() => {
    setSportFilter(favorite || 'All');
  }, [favorite]);

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

        <p className="eyebrow">SPORTS HUB</p>

        <h1>Sports, Teams & Schedules.</h1>

        <p>
          Explore football, basketball and tennis.
          Discover teams and save your favorite matches.
        </p>

        {signedIn ? (

          <p>
            Welcome, <strong>{demoUser.name}</strong>!
            Your saved matches belong to your demo profile.
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
              className="card"
              key={sport.name}
            >
              <h3>{sport.name}</h3>

              <p>{sport.description}</p>

              <p className="muted">
                <strong>Featured clubs / players: </strong>
                {sport.team}
              </p>

            </article>

          ))}

        </div>

      </section>

      {/* MATCH SCHEDULE */}
      <section className="section-card">

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

            <caption>Sports Hub Match Schedule</caption>

            <thead>
              <tr>
                <th>Sport</th>
                <th>Match</th>
                <th>Competition</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredMatches.map((item) => (

                <tr key={`${item.sport}-${item.match}`}>

                  <td>{item.sport}</td>

                  <td>{item.match}</td>

                  <td>{item.tournament}</td>

                  <td>{item.date}</td>

                  <td>{item.time}</td>

                  <td>{item.status}</td>

                  <td>

                    {/* SAVE / REMOVE */}
                    <button
                      type="button"
                      disabled={!signedIn}
                      onClick={() =>
                        toggleSaved(item.match)
                      }
                    >
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
