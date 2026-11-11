
import { useState } from 'react';
import { Link } from 'react-router-dom';

const initialForm = {
  fullname: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const AuthPanel = ({
  demoUser,
  favorite,
  onEnter,
  onLeave
}) => {

  const [mode, setMode] = useState('signin');
  const [form, setForm] = useState(initialForm);
  const [notice, setNotice] = useState('');

  // Load registered demo accounts
  const [accounts, setAccounts] = useState(() => {
    try {
      const stored = localStorage.getItem(
        'sportsHubDemoAccounts'
      );

      const parsed = stored ? JSON.parse(stored) : [];

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Update input values
  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value
    }));
  };

  // Switch Sign In / Sign Up
  const changeMode = (newMode) => {
    setMode(newMode);
    setNotice('');
    setForm(initialForm);
  };

  // Handle Sign In / Sign Up
  const handleSubmit = (event) => {
    event.preventDefault();

    setNotice('');

    const email = form.email.trim().toLowerCase();

    if (!email || !form.password) {
      setNotice('Please enter your email and password.');
      return;
    }

    // Check if demo email is registered
    const existingAccount = accounts.find(
      (account) => account.email === email
    );

    // SIGN UP
    if (mode === 'signup') {

      if (!form.fullname.trim()) {
        setNotice('Please enter your full name.');
        return;
      }

      if (form.password.length < 8) {
        setNotice('Use at least 8 characters.');
        return;
      }

      if (form.password !== form.confirmPassword) {
        setNotice('Passwords do not match.');
        return;
      }

      if (existingAccount) {
        setNotice(
          'This email is already registered. Please sign in.'
        );
        return;
      }

      const newAccount = {
        name: form.fullname.trim(),
        email: email
      };

      const updatedAccounts = [...accounts, newAccount];

      setAccounts(updatedAccounts);

      // Save only profile details, not passwords
      try {
        localStorage.setItem(
          'sportsHubDemoAccounts',
          JSON.stringify(updatedAccounts)
        );
      } catch {
        // Continue in memory
      }

      setForm(initialForm);

      // Send full account object to App.js
      onEnter(newAccount);

      return;
    }

    // SIGN IN
    if (mode === 'signin') {

      if (!existingAccount) {
        setNotice(
          'Account not found. Please sign up first.'
        );
        return;
      }

      // Frontend demo: email registration check only
      // Passwords are not verified or stored.
      onEnter(existingAccount);

      setForm(initialForm);
    }
  };

  return (
    <section className="section-card auth-section">

      <div className="auth-intro">

        <p className="eyebrow">JOIN ATHLYX</p>

        <h2>Your Sports. Your Space.</h2>

        <p>
          Create your ATHLYX  profile,
          discover sports schedules and save
          your favorite matches.
        </p>

        <div className="auth-benefits">
          <p>✓ Choose your favorite sport</p>
          <p>✓ Explore sports schedules</p>
          <p>✓ Save your favorite matches</p>
        </div>

      </div>

      <div className="auth-content">

        {demoUser ? (

          // ACTIVE DEMO PROFILE
          <div className="auth-welcome">

            <p className="eyebrow">
               PROFILE ACTIVE
            </p>

            <h3>
              Welcome, {demoUser.name}! 👋
            </h3>

            <p>
              Your email: {demoUser.email}
            </p>

            <p>
              Your favorite sport:
              <strong> {favorite}</strong>
            </p>

            <Link
              className="auth-submit"
              to="/menu"
            >
              Explore Matches →
            </Link>

            <button
              type="button"
              className="btn-secondary"
              onClick={onLeave}
            >
              Sign Out
            </button>

          </div>

        ) : (

          // SIGN IN / SIGN UP
          <div>

            <div className="auth-tabs">

              <button
                type="button"
                className={
                  mode === 'signin' ? 'active' : ''
                }
                onClick={() => changeMode('signin')}
              >
                Sign In
              </button>

              <button
                type="button"
                className={
                  mode === 'signup' ? 'active' : ''
                }
                onClick={() => changeMode('signup')}
              >
                Sign Up
              </button>

            </div>

            <h3>
              {mode === 'signin'
                ? 'Welcome Back'
                : 'Create Your Profile'}
            </h3>

            <form onSubmit={handleSubmit}>

              {mode === 'signup' && (
                <>
                  <label htmlFor="auth-name">
                    Full Name
                  </label>

                  <input
                    id="auth-name"
                    type="text"
                    name="fullname"
                    placeholder="Enter your name"
                    value={form.fullname}
                    onChange={updateField}
                    required
                  />
                </>
              )}

              <label htmlFor="auth-email">
                Email Address
              </label>

              <input
                id="auth-email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={updateField}
                required
              />

              <label htmlFor="auth-password">
                 Password
              </label>

              <input
                id="auth-password"
                type="password"
                name="password"
                placeholder="Use a password"
                value={form.password}
                onChange={updateField}
                required
              />

              {mode === 'signup' && (
                <>
                  <label htmlFor="auth-confirm">
                    Confirm  Password
                  </label>

                  <input
                    id="auth-confirm"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm  password"
                    value={form.confirmPassword}
                    onChange={updateField}
                    required
                  />
                </>
              )}

              <button
                className="auth-submit"
                type="submit"
              >
                {mode === 'signin'
                  ? 'Confirm'
                  : 'Create  Profile'}
              </button>

            </form>

            {notice && (
              <p className="auth-notice" role="alert">
                {notice}
              </p>
            )}

            <p className="auth-demo-note">
              Frontend demo only. Sign-in checks the
              registered email, not the password.
              Never use a real password here.
            </p>

          </div>

        )}

      </div>

    </section>
  );
};

export default AuthPanel;
