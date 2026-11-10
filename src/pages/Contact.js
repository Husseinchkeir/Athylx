import { useState } from 'react';

const initialForm = {
  fullname: '',
  email: '',
  sport: 'Football',
  daily: '',
  message: ''
};

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [notice, setNotice] = useState(null);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.fullname.trim() || !form.email.trim() || !form.message.trim() || !form.daily) {
      setNotice({ type: 'error', text: 'Please complete your name, email, daily choice and message before submitting.' });
      return;
    }

    setNotice({ type: 'success', text: `Thank you, ${form.fullname}. Your Sports Hub feedback was saved on this page.` });
    setForm(initialForm);
  };

  return (
    <main className="page">
      <section className="hero-panel small-hero">
        <p className="eyebrow">Contact</p>
         <h1>Let's Talk Sports.</h1>
         <p>
        Have feedback or suggestions?
        We'd love to hear from you.
        </p>      </section>

      <section className="section-card">
        <h2>Contact Form</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            placeholder="Enter your name"
            value={form.fullname}
            onChange={updateField}
          />

          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={updateField}
          />

          <label htmlFor="sport">Favorite Sport</label>
          <select id="sport" name="sport" value={form.sport} onChange={updateField}>
            <option>Football</option>
            <option>Basketball</option>
            <option>Tennis</option>
            <option>Other</option>
          </select>

          <label>Do you follow sports daily?</label>
          <div className="radio-line">
            <label htmlFor="yes">
              <input
                type="radio"
                id="yes"
                name="daily"
                value="yes"
                checked={form.daily === 'yes'}
                onChange={updateField}
              />
              Yes
            </label>
            <label htmlFor="no">
              <input
                type="radio"
                id="no"
                name="daily"
                value="no"
                checked={form.daily === 'no'}
                onChange={updateField}
              />
              No
            </label>
          </div>

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            placeholder="Write your message here"
            value={form.message}
            onChange={updateField}
          />

          <button className="btn" type="submit">Submit</button>
        </form>

        {notice && <p className={`form-notice ${notice.type}`}>{notice.text}</p>}
      </section>

      <section className="section-card contact-info">
        <h2>Contact Information</h2>
        <p>Email us using this link: <a href="mailto:sportshub@gmail.com">sportshub@gmail.com</a></p>
      </section>
    </main>
  );
}

export default Contact;
