import { useState } from 'react'

const EMAIL = 'arjunpadinjarethil33@gmail.com'
const PHONE = '+91 85909 33978'

// Paste your webhook URL here (GHL, Make, Zapier, n8n, etc.)
const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/KJdsZd0VIJo3DQTMVkSM/webhook-trigger/f24b0b81-078c-48af-ab78-4b0519226275'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          source: 'portfolio-contact-form',
          submittedAt: new Date().toISOString(),
        }),
      })

      if (!res.ok) throw new Error('Webhook request failed')

      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error('Contact form webhook error:', err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="contact section">

      <div className="contact__grid">
        <div className="contact__intro">
          <p className="eyebrow">04 — Contact</p>
          <h2 className="contact__heading">
            Let's automate
            <br /> something.
          </h2>
          <p className="contact__desc">
            Have a business that needs its lead flow, calls or funnels
            wired together? Tell me what you're working with and I'll
            get back to you.
          </p>

          <div className="contact__details">
            <a href={`mailto:${EMAIL}`} className="contact__detail">{EMAIL}</a>
            <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="contact__detail">{PHONE}</a>
          </div>
        </div>

        <form className="contact__form" onSubmit={handleSubmit}>
          <label className="contact__field">
            <span className="eyebrow">Name</span>
            <input type="text" required value={form.name} onChange={update('name')} placeholder="Your name" />
          </label>
          <label className="contact__field">
            <span className="eyebrow">Email</span>
            <input type="email" required value={form.email} onChange={update('email')} placeholder="you@company.com" />
          </label>
          <label className="contact__field">
            <span className="eyebrow">Message</span>
            <textarea rows={5} required value={form.message} onChange={update('message')} placeholder="What are you looking to build or automate?" />
          </label>

          <button type="submit" className="btn btn--filled contact__submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p className="contact__status contact__status--success">
              Message sent — I'll get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p className="contact__status contact__status--error">
              Something went wrong. Try again, or email me directly.
            </p>
          )}
        </form>
      </div>

      <style>{`
        .contact { padding-top: 60px; padding-bottom: 60px; }
        .contact__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--gutter);
          padding-top: 32px;
        }
        .contact__heading {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(36px, 5vw, 60px);
          line-height: 1.05;
          margin: 14px 0 20px;
        }
        .contact__desc {
          font-size: 15px;
          line-height: 1.7;
          color: var(--ink-soft);
          max-width: 420px;
          margin-bottom: 32px;
        }
        .contact__details {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .contact__detail {
          font-family: var(--font-mono);
          font-size: 14px;
          border-bottom: 1px solid var(--line);
          padding-bottom: 6px;
          width: fit-content;
        }
        .contact__detail:hover { border-color: var(--ink); }

        .contact__form {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        .contact__field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .contact__field input,
        .contact__field textarea {
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--line);
          padding: 10px 0;
          font-family: var(--font-body);
          font-size: 15px;
          color: var(--ink);
          resize: vertical;
        }
        .contact__field input::placeholder,
        .contact__field textarea::placeholder {
          color: var(--muted);
        }
        .contact__field input:focus,
        .contact__field textarea:focus {
          outline: none;
          border-color: var(--ink);
        }
        .contact__submit {
          align-self: flex-start;
          margin-top: 8px;
        }
        .contact__submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .contact__status {
          font-size: 13px;
          margin-top: 4px;
        }
        .contact__status--success { color: var(--ink); }
        .contact__status--error { color: #a33; }

        @media (max-width: 780px) {
          .contact__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}