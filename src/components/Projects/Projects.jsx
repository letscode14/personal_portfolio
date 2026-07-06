import { useNavigate } from 'react-router-dom'
import './Projects.css'

const PROJECTS = [
  {
    tag: 'Voice AI · GHL',
    title: 'AI Voice Receptionist for Local Service Businesses',
    desc: 'A Vapi-powered voice agent that answers inbound calls, qualifies the caller and books the job straight into the GoHighLevel calendar — built for HVAC and home-service clients who were losing leads to voicemail.',
    stack: ['Vapi', 'GoHighLevel', 'Webhooks'],
    cta: { label: 'Test Out the Voice Agent', href: '#' },
  },
  {
    tag: 'Funnels & Automation',
    title: 'Full-Funnel Automation Suite for a Coaching Brand',
    desc: 'End-to-end GHL build: opt-in funnel, nurture sequence, pipeline stages and a no-show follow-up automation that re-books missed calls automatically.',
    stack: ['GoHighLevel', 'Sales Funnels', 'Automations'],
  },
  {
    tag: 'Web Design',
    title: 'Conversion-Focused Landing Pages & Funnel Design',
    desc: 'Clean, fast-loading landing page and funnel designs built for conversion — laid out to pair directly with GHL forms, calendars and automations behind the scenes.',
    stack: ['Web Design', 'GoHighLevel', 'Sales Funnels'],
    cta: { label: 'View Design Template', href: '#' },
  },
  {
    tag: 'Voice AI · Integration',
    title: 'Lead Qualification & Booking Bot',
    desc: 'A Voiceflow conversational agent wired through n8n into GHL, screening inbound leads against qualification criteria before a booked call ever hits the calendar.',
    stack: ['Voiceflow', 'n8n', 'GoHighLevel'],
    cta: { label: 'Test Out the Voice Agent', href: '#voice-agents' },
  },
  {
    tag: 'Integrations',
    title: 'Cross-Platform Automation Pipeline',
    desc: 'Connected GoHighLevel, Stripe and Slack through Make and Zapier so payment events, deal updates and internal alerts stay in sync without manual re-entry anywhere.',
    stack: ['Make.com', 'Zapier', 'Webhooks'],
  },
  {
    tag: 'Voice AI · Onboarding',
    title: 'Client Onboarding Automation System',
    desc: 'A Formwise intake form triggers a Synthflow voice check-in and a GHL onboarding workflow — turning a signed contract into a fully onboarded client with zero manual steps.',
    stack: ['Formwise', 'Synthflow', 'GoHighLevel'],
  },
]

export default function Projects() {
  const navigate = useNavigate()

  return (
    <section id="work" className="projects section">

      <div className="projects__head">
        <p className="eyebrow">03 — Selected Work</p>
        <h2 className="projects__heading">Systems I've shipped</h2>
      </div>

      <div className="projects__list">
        {PROJECTS.map((p, i) => (
          <div className="projects__row" key={p.title}>
            <span className="projects__num">{String(i + 1).padStart(2, '0')}</span>
            <div className="projects__content">
              <p className="eyebrow projects__tag">{p.tag}</p>
              <h3 className="projects__title">{p.title}</h3>
              <p className="projects__desc">{p.desc}</p>
              <div className="projects__stack">
                {p.stack.map((s) => (
                  <span key={s} className="projects__pill">{s}</span>
                ))}
              </div>
              {p.cta && (
                p.cta.label === 'View Design Template' ? (
                  <button
                    className="btn-web btn--outline projects__cta"
                    onClick={() => navigate('/designs')}
                  >
                    {p.cta.label}
                  </button>
                ) : (
                  <a href={p.cta.href} className="btn-web btn--outline projects__cta">
                    {p.cta.label}
                  </a>
                )
              )}
            </div>
          </div>
        ))}
      </div>


    </section>
  )
}