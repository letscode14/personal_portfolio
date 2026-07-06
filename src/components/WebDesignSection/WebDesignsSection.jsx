import { useNavigate } from 'react-router-dom'
import "./WebSection.css"

const DESIGNS = [
  {
    title: 'Webinar Registration Page',
    tag: 'Webinar',
    desc: 'A single-focus registration page built to drive sign-ups — countdown, speaker proof and one CTA repeated at every scroll depth.',
    link: 'https://link.scaleflowsolutions.online/preview/syojlB3fsv6KEca0BJWO',
  },
  {
    title: 'Fitness Coach Landing Page',
    tag: 'Fitness',
    desc: 'A conversion-focused landing page for fitness coaches — offer, transformation proof and a booking CTA wired to a GHL calendar.',
    link: 'https://link.scaleflowsolutions.online/preview/xtyjCIh9BkZF1CZOjEth',
  },
  {
    title: 'Fitness Funnel — Alternate Layout',
    tag: 'Fitness',
    desc: 'A second take on the fitness funnel with a different hero and proof arrangement for A/B testing against the first version.',
    link: 'https://link.scaleflowsolutions.online/preview/ZksOdI5EvGMZtyxIEiuM',
  },
  {
    title: 'Roof Coach Landing Page',
    tag: 'Home Services',
    desc: 'A local-service landing page for roofing consultants — trust badges, before/after proof, and a quote-request form.',
    link: 'http://link.scaleflowsolutions.online/preview/DU4NA0oznzYRpa4NZsOs',
  },
  {
    title: 'Auto Detailing Landing Page',
    tag: 'Auto Detailing',
    desc: 'A service-page layout for auto detailing businesses — package pricing, gallery and a booking CTA tied to GHL.',
    link: 'https://link.scaleflowsolutions.online/preview/a3E2dTWPLNvVLyRKjcjx',
  },
  {
    title: 'Auto Detailing — Alternate Layout',
    tag: 'Auto Detailing',
    desc: 'A second auto detailing layout with a different offer structure and testimonial placement for comparison testing.',
    link: 'https://link.scaleflowsolutions.online/preview/kgeXGrYZg2IBOuCG219T',
  },
]

// Simple line-art thumbnail — abstracts the layout rather than faking a screenshot
function WireframeThumb({ variant }) {
  const v = variant % 4
  return (
    <svg viewBox="0 0 240 160" className="wd__thumb-svg" aria-hidden="true">
      <rect x="0.5" y="0.5" width="239" height="159" fill="none" stroke="var(--line)" />
      <rect x="16" y="16" width="60" height="8" fill="none" stroke="var(--ink-soft)" />
      <rect x="164" y="16" width="60" height="8" fill="none" stroke="var(--ink-soft)" />
      {v === 0 && (
        <>
          <rect x="16" y="44" width="208" height="46" fill="none" stroke="var(--ink-soft)" />
          <rect x="16" y="100" width="60" height="6" fill="none" stroke="var(--line)" />
          <rect x="16" y="112" width="100" height="6" fill="none" stroke="var(--line)" />
          <rect x="16" y="130" width="44" height="14" fill="none" stroke="var(--ink-soft)" />
        </>
      )}
      {v === 1 && (
        <>
          <circle cx="46" cy="70" r="14" fill="none" stroke="var(--ink-soft)" />
          <circle cx="120" cy="70" r="14" fill="none" stroke="var(--line)" />
          <circle cx="194" cy="70" r="14" fill="none" stroke="var(--line)" />
          <line x1="60" y1="70" x2="106" y2="70" stroke="var(--line)" strokeDasharray="3 3" />
          <line x1="134" y1="70" x2="180" y2="70" stroke="var(--line)" strokeDasharray="3 3" />
          <rect x="90" y="120" width="60" height="14" fill="none" stroke="var(--ink-soft)" />
        </>
      )}
      {v === 2 && (
        <>
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={16 + i * 72}
              y="44"
              width="60"
              height="90"
              fill="none"
              stroke={i === 1 ? 'var(--ink-soft)' : 'var(--line)'}
            />
          ))}
        </>
      )}
      {v === 3 && (
        <>
          <rect x="16" y="44" width="208" height="10" fill="none" stroke="var(--ink-soft)" />
          <rect x="16" y="62" width="130" height="72" fill="none" stroke="var(--line)" />
          <rect x="154" y="62" width="70" height="34" fill="none" stroke="var(--line)" />
          <rect x="154" y="102" width="70" height="32" fill="none" stroke="var(--line)" />
        </>
      )}
    </svg>
  )
}

export default function WebDesignsSection({ standalone = false }) {
  const navigate = useNavigate()

  return (
    <section id="designs" className={`wd section ${standalone ? 'wd--standalone' : ''}`}>
      {standalone ? (
        <button className="wd__back" onClick={() => navigate('/')}>
          <span className="wd__backIcon">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M8.5 1.5L2 7l6.5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          Back to home
        </button>
      ) : (
        <hr className="hairline" />
      )}

      <div className="wd__head">
        <p className="eyebrow">{standalone ? 'Website Designs' : '05 — Website Designs'}</p>
        <h2 className="wd__heading">Layouts built to convert</h2>
      </div>

      <div className="wd__grid">
        {DESIGNS.map((d, i) => (
          <div key={d.title} className="wd__card">
            <WireframeThumb variant={i} />
            <p className="eyebrow wd__tag">{d.tag}</p>
            <p className="wd__title">{d.title}</p>
            <p className="wd__desc">{d.desc}</p>
            <a
              href={d.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-web btn--outline wd__cta"
            >
              View Template
            </a>
          </div>
        ))}
      </div>


    </section>
  )
}