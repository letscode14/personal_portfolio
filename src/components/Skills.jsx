const GROUPS = [
  {
    label: 'GHL & Growth Systems',
    items: ['GoHighLevel Development', 'Sales Funnel Building', 'Automations & Workflows', 'Web Development'],
  },
  {
    label: 'Voice AI',
    items: ['Vapi', 'Retell AI', 'Voiceflow', 'Synthflow'],
  },
  {
    label: 'Integrations & Forms',
    items: ['Make.com', 'Zapier', 'n8n', 'Webhooks', 'Formwise'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="skills section">
      <hr className="hairline" />
      <div className="skills__head">
        <p className="eyebrow">02 — Skills</p>
        <h2 className="skills__heading">The stack I build with</h2>
      </div>

      <div className="skills__grid">
        {GROUPS.map((g, i) => (
          <div className="skills__card" key={g.label}>
            <span className="skills__index">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="skills__group-label">{g.label}</h3>
            <ul className="skills__list">
              {g.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <style>{`
        .skills { padding-top: 60px; padding-bottom: 40px; }
        .skills__head { padding-top: 32px; margin-bottom: 40px; }
        .skills__heading {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(26px, 3.4vw, 40px);
          margin-top: 12px;
        }
        .skills__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid var(--line);
          border-left: 1px solid var(--line);
        }
        .skills__card {
          border-right: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          padding: 32px 28px 40px;
          position: relative;
        }
        .skills__index {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--muted);
        }
        .skills__group-label {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 600;
          margin: 16px 0 20px;
        }
        .skills__list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .skills__list li {
          font-size: 14px;
          color: var(--ink-soft);
          padding-left: 14px;
          position: relative;
        }
        .skills__list li::before {
          content: '';
          position: absolute;
          left: 0; top: 8px;
          width: 5px; height: 1px;
          background: var(--ink);
        }
        @media (max-width: 860px) {
          .skills__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
