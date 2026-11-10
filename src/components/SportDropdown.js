
import { useState } from 'react';

const SportDropdown = ({
  value,
  onChange,
  includeAll = false
}) => {

  const [open, setOpen] = useState(false);

  const sports = [
    { name: 'Football', icon: '⚽' },
    { name: 'Basketball', icon: '🏀' },
    { name: 'Tennis', icon: '🎾' }
  ];

  const options = includeAll
    ? [{ name: 'All', icon: '🏟️' }, ...sports]
    : sports;

  const handleSelect = (sport) => {
    onChange(sport);
    setOpen(false);
  };

  return (
    <div
      className="sport-dropdown"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setOpen(false);
        }
      }}
    >

      <button
        type="button"
        className={`sport-dropdown__trigger ${open ? 'is-open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="sport-dropdown__current">

          <span className="sport-dropdown__icon">
            {value === 'Football' ? '⚽' :
             value === 'Basketball' ? '🏀' :
             value === 'Tennis' ? '🎾' : '🏟️'}
          </span>

          {value === 'All' ? 'All Sports' : value}

        </span>

        <span className="sport-dropdown__arrow">
          ⌄
        </span>
      </button>

      <div
        className={`sport-dropdown__panel ${open ? 'is-visible' : ''}`}
        aria-hidden={!open}
      >

        {options.map((sport) => (

          <button
            key={sport.name}
            type="button"
            tabIndex={open ? 0 : -1}
            className={`sport-dropdown__option ${
              value === sport.name ? 'is-selected' : ''
            }`}
            onClick={() => handleSelect(sport.name)}
          >

            <span className="sport-dropdown__option-label">

              <span className="sport-dropdown__icon">
                {sport.icon}
              </span>

              {sport.name === 'All'
                ? 'All Sports'
                : sport.name}

            </span>

            {value === sport.name && (
              <span className="sport-dropdown__check">
                ✓
              </span>
            )}

          </button>

        ))}

      </div>

    </div>
  );
};

export default SportDropdown;
